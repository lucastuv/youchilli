'use client'

import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, SkipForward, SkipBack, Repeat, Shuffle, Plus, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { VideoData } from '../../lib/videoData'
import { usePlaylist } from '../../contexts/PlaylistContextForced'
import { usePlayerState } from '../../contexts/PlayerStateContext'

interface VideoPlayerProps {
  video?: VideoData
  url?: string
  title?: string
  artist?: string
  featuring?: string[]
  thumbnail?: string
  className?: string
  onEnded?: () => void
  showPlaylistControls?: boolean
  enableAutoNext?: boolean
}

export default function VideoPlayer({
  video,
  url,
  title,
  artist,
  featuring,
  thumbnail,
  className = '',
  onEnded,
  showPlaylistControls = true,
  enableAutoNext = true
}: VideoPlayerProps) {
  // Hooks do contexto de playlist
  const {
    currentVideo,
    playlist,
    isPlaying: contextIsPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    addToPlaylist,
    setCurrentVideo
  } = usePlaylist()

  // Estado global para coordenação entre players
  const { 
    setHasActiveVideoPlayer, 
    globalHasUserInteracted, 
    setGlobalHasUserInteracted 
  } = usePlayerState()

  // Usar dados do video object ou fallback para props individuais
  const videoUrl = video?.url || url || ''
  const videoTitle = video?.title || title || 'Música'
  const videoArtist = video?.artist || artist || 'Artista'
  const videoFeaturing = video?.featuring || featuring || []
  const videoThumbnail = video?.thumbnail || thumbnail
  
  // Sincronizar estado local com contexto quando há controles de playlist
  const [playing, setPlaying] = useState(false) // Sempre iniciar pausado
  
  // Usar estado global de interação do usuário
  const hasUserInteracted = globalHasUserInteracted
  
  // DEBUG: Log quando playing muda
  useEffect(() => {
    console.log('🎵 VideoPlayer: playing state changed to:', playing)
  }, [playing])
  const [volume, setVolume] = useState(1) // Volume máximo por padrão
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showPlaylistPanel, setShowPlaylistPanel] = useState(false)

  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Marcar que este VideoPlayer está ativo (para evitar conflito com PlaylistControls)
  useEffect(() => {
    setHasActiveVideoPlayer(true)
    return () => setHasActiveVideoPlayer(false)
  }, [setHasActiveVideoPlayer])

  // Sincronizar estado de reprodução com o contexto
  useEffect(() => {
    if (showPlaylistControls && currentVideo?.id === video?.id) {
      console.log('🎵 VideoPlayer: Syncing with context, contextIsPlaying:', contextIsPlaying)
      setPlaying(contextIsPlaying)
    }
  }, [contextIsPlaying, showPlaylistControls, currentVideo?.id, video?.id])

  // Detectar quando a música atual muda no contexto
  useEffect(() => {
    if (showPlaylistControls && currentVideo && currentVideo.id !== video?.id) {
      // Se uma nova música foi selecionada no contexto, pausar este player
      setPlaying(false)
    }
  }, [currentVideo, video?.id, showPlaylistControls])

  // Quando um novo vídeo é definido no contexto, começar a tocar se isPlaying estiver true
  useEffect(() => {
    if (showPlaylistControls && currentVideo?.id === video?.id && contextIsPlaying && !playing) {
      setPlaying(true)
    }
  }, [currentVideo?.id, video?.id, contextIsPlaying, playing, showPlaylistControls])

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      setShowControls(true)
      controlsTimeoutRef.current = setTimeout(() => {
        if (playing) setShowControls(false)
      }, 3000)
    }

    if (playing) {
      resetControlsTimeout()
    } else {
      setShowControls(true)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [playing])

  // Format time
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handlers
  const handlePlayPause = () => {
    console.log('🎵 VideoPlayer: Play/Pause clicked, current playing:', playing, 'volume:', volume, 'muted:', muted)
    setGlobalHasUserInteracted(true) // Para log/tracking
    const newPlayingState = !playing
    
    if (showPlaylistControls) {
      // Se está iniciando a reprodução, definir este vídeo como atual no contexto
      if (newPlayingState && video) {
        setCurrentVideo(video)
        // O contexto vai atualizar isPlaying, que vai sincronizar de volta
        if (!contextIsPlaying) {
          togglePlay()
        }
      } else {
        // Se está pausando, apenas toggle do contexto
        togglePlay()
      }
    } else {
      // Se não usa controles de playlist, controle local
      setPlaying(newPlayingState)
    }
  }

  const handleReady = () => {
    console.log('🎵 VideoPlayer: Player ready, volume:', volume, 'muted:', muted)
    setIsReady(true)
  }

  const handleError = (error: any) => {
    console.error('VideoPlayer: Error loading video', { error, video: video?.title, url: videoUrl })
    setHasError(true)
  }

  const handleEnd = () => {
    if (enableAutoNext && showPlaylistControls && playlist.length > 1) {
      playNext()
    } else if (onEnded) {
      onEnded()
    }
  }

  const handleAddToPlaylist = () => {
    if (video) {
      addToPlaylist(video)
    }
  }

  const handleNext = () => {
    if (showPlaylistControls) {
      playNext()
    }
  }

  const handlePrevious = () => {
    if (showPlaylistControls) {
      playPrevious()
    }
  }

  const handleProgress = (state: { played: number; loaded: number }) => {
    if (!seeking) {
      setPlayed(state.played)
      setLoaded(state.loaded)
    }
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekChange = (value: number) => {
    setPlayed(value)
  }

  const handleSeekMouseUp = (value: number) => {
    setSeeking(false)
    if (playerRef.current) {
      playerRef.current.seekTo(value)
    }
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    setMuted(value === 0)
  }

  const handleMute = () => {
    setMuted(!muted)
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 3000)
  }

  const handleRestart = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setPlaying(true)
    }
  }

  if (hasError) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-effect p-8 rounded-lg text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Erro ao carregar vídeo</h3>
            <p className="text-white/60 mb-4">
              Não foi possível reproduzir "{videoTitle}"
            </p>
            <button
              onClick={() => {
                setHasError(false)
                setIsReady(false)
              }}
              className="glass-effect px-6 py-2 rounded-full hover:bg-chilli-red/20 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Player */}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={setDuration}
        onReady={handleReady}
        onError={handleError}
        onEnded={handleEnd}
        light={false}
        controls={false}
        pip={false}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0
            }
          },
          file: {
            attributes: {
              crossOrigin: 'anonymous',
              playsInline: true,
              preload: 'metadata'
            }
          }
        }}
      />

      {/* Loading State */}
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="glass-effect p-6 rounded-lg text-center">
            <div className="animate-spin w-8 h-8 border-2 border-chilli-red border-t-transparent rounded-full mb-4 mx-auto"></div>
            <p className="text-white/80">Carregando vídeo...</p>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
          >
            {/* Center Play Button */}
            {!playing && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </button>
              </motion.div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative h-1 bg-white/20 rounded-full cursor-pointer group/progress">
                  <div
                    className="absolute h-full bg-chilli-red rounded-full transition-all"
                    style={{ width: `${played * 100}%` }}
                  />
                  <div
                    className="absolute h-full bg-white/40 rounded-full"
                    style={{ width: `${loaded * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.001}
                    value={played}
                    onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={(e) => handleSeekMouseUp(parseFloat(e.currentTarget.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Previous (only if playlist controls enabled) */}
                  {showPlaylistControls && (
                    <button
                      onClick={handlePrevious}
                      disabled={playlist.length <= 1}
                      className="glass-effect p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SkipBack className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    {playing ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Next (only if playlist controls enabled) */}
                  {showPlaylistControls && (
                    <button
                      onClick={handleNext}
                      disabled={playlist.length <= 1}
                      className="glass-effect p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SkipForward className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Restart */}
                  <button
                    onClick={handleRestart}
                    className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>

                  {/* Shuffle (only if playlist controls enabled) */}
                  {showPlaylistControls && (
                    <button
                      onClick={toggleShuffle}
                      className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                        isShuffling ? 'bg-chilli-red/30' : ''
                      }`}
                    >
                      <Shuffle className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Loop (only if playlist controls enabled) */}
                  {showPlaylistControls && (
                    <button
                      onClick={toggleLoop}
                      className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                        isLooping ? 'bg-chilli-red/30' : ''
                      }`}
                    >
                      <Repeat className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMute}
                      className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                    >
                      {muted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-white/20 rounded-full appearance-none slider"
                    />
                  </div>

                  {/* Time */}
                  <div className="text-white text-sm font-mono">
                    {formatTime(played * duration)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Add to Playlist */}
                  {video && showPlaylistControls && (
                    <button
                      onClick={handleAddToPlaylist}
                      className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                      title="Adicionar à playlist"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Show Playlist */}
                  {showPlaylistControls && (
                    <button
                      onClick={() => setShowPlaylistPanel(!showPlaylistPanel)}
                      className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                        showPlaylistPanel ? 'bg-chilli-red/30' : ''
                      }`}
                      title={`${showPlaylistPanel ? 'Ocultar' : 'Mostrar'} playlist`}
                    >
                      <List className="w-4 h-4 text-white" />
                    </button>
                  )}

                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    <Maximize className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Top Info */}
            <div className="absolute top-4 left-4 right-4">
              <div className="glass-effect p-4 rounded-lg">
                <h3 className="font-semibold text-white text-lg mb-1">{videoTitle}</h3>
                <p className="text-white/80">
                  {videoArtist}
                  {videoFeaturing && videoFeaturing.length > 0 && (
                    <span className="text-chilli-red/90">
                      {' feat. '}{videoFeaturing.join(', ')}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlist Panel */}
      <AnimatePresence>
        {showPlaylistPanel && showPlaylistControls && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-xl border-l border-white/20 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Playlist</h3>
                <span className="text-white/60 text-sm">{playlist.length} música{playlist.length !== 1 ? 's' : ''}</span>
              </div>

              {playlist.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="text-white/60">Nenhuma música na playlist</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {playlist.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg glass-effect hover:bg-white/10 transition-colors cursor-pointer ${
                        currentVideo?.id === video.id ? 'bg-chilli-red/20 border border-chilli-red/40' : ''
                      }`}
                      onClick={() => setCurrentVideo(video)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-chilli-red/40 to-chilli-red/20 flex items-center justify-center">
                              <span className="text-xs text-white">🎵</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-white font-medium text-sm truncate">{video.title}</h4>
                          <p className="text-white/60 text-xs truncate">{video.artist}</p>
                          {video.featuring && video.featuring.length > 0 && (
                            <p className="text-chilli-red/80 text-xs truncate">
                              feat. {video.featuring.join(', ')}
                            </p>
                          )}
                        </div>
                        {currentVideo?.id === video.id && (
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-chilli-red rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff0000;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff0000;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
