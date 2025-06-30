'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, List, X, Trash2 } from 'lucide-react'
import ReactPlayer from 'react-player'
import { usePlaylist } from '../../contexts/PlaylistContextForced'
import { usePlayerState } from '../../contexts/PlayerStateContext'

interface PlaylistControlsProps {
  className?: string
  compact?: boolean
  hideInternalPlayer?: boolean // Nova prop para ocultar player interno quando há VideoPlayer ativo
}

export default function PlaylistControls({ className = '', compact = false, hideInternalPlayer = false }: PlaylistControlsProps) {
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [convertedUrl, setConvertedUrl] = useState('')
  const playerRef = useRef<ReactPlayer>(null)
  
  // Estado global para coordenação entre players
  const { 
    globalHasUserInteracted, 
    setGlobalHasUserInteracted 
  } = usePlayerState()
  
  // Usar estado global de interação do usuário
  const hasUserInteracted = globalHasUserInteracted
  
  const playlist = usePlaylist()
  const {
    currentVideo,
    playlist: playlistVideos,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    setCurrentVideo,
    removeFromPlaylist,
    clearPlaylist
  } = playlist

  // Controla mudanças de vídeo
  useEffect(() => {
    // Silencioso - sem logs
  }, [currentVideo?.id])

  useEffect(() => {
    if (currentVideo?.url) {
      setConvertedUrl(currentVideo.url)
      setPlayerReady(false)
    }
  }, [currentVideo?.url])

  // Handlers para o ReactPlayer
  const handleEnded = () => {
    if (isLooping && playlistVideos.length === 1) {
      // Se só tem uma música e está em loop, reinicia
      if (playerRef.current) {
        playerRef.current.seekTo(0)
        // togglePlay mantém o estado
      }
    } else {
      // Toca próxima música
      playNext()
    }
  }

  const handleError = (error: any) => {
    // Error silencioso - player tentará continuar
  }

  const handleReady = () => {
    setPlayerReady(true)
  }

  const handleLoadStart = () => {
    // Player iniciando carregamento
  }

  const handleProgress = (state: any) => {
    // Progresso silencioso
  }

  const handleBuffer = () => {
    // Buffering silencioso
  }

  const handleBufferEnd = () => {
    // Buffer finalizado
  }

  // Configuração do player para MP4 com mais opções de debug
  const getPlayerConfig = () => {
    return {
      file: {
        attributes: {
          crossOrigin: 'anonymous',
          playsInline: true,
          preload: 'metadata', // Carrega metadados primeiro
          muted: false
        }
      }
    }
  }

  const handlePlay = () => {
    setGlobalHasUserInteracted(true) // Marca que usuário interagiu
  }

  const handlePause = () => {
    // Pausado
  }

  // Toggle play handler - marca interação do usuário
  const handleTogglePlay = () => {
    setGlobalHasUserInteracted(true) // Essencial para som funcionar
    togglePlay()
  }

  // Reset player ready state when video changes
  useEffect(() => {
    if (currentVideo) {
      setPlayerReady(false)
    }
  }, [currentVideo?.id])

  // Controles funcionais - mostrar sempre
  const shouldShow = true

  if (!shouldShow) {
    return null
  }

  return (
    <>
      {/* Mini Player / Controls Bar */}
      <div className={`bg-black/90 backdrop-blur-xl border-t border-white/20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Current Song Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {currentVideo ? (
                <>
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    {currentVideo.thumbnail ? (
                      <img
                        src={currentVideo.thumbnail}
                        alt={currentVideo.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-chilli-red/40 to-chilli-red/20 flex items-center justify-center">
                        <span className="text-xs text-white">🎵</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">{currentVideo.title}</h4>
                    <p className="text-white/60 text-xs truncate">
                      {currentVideo.artist}
                      {currentVideo.featuring && currentVideo.featuring.length > 0 && (
                        <span className="text-chilli-red/80">
                          {' feat. '}{currentVideo.featuring.join(', ')}
                        </span>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-chilli-red/40 to-chilli-red/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">🎵</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-medium text-sm">YouChilli Player</h4>
                    <p className="text-white/60 text-xs">
                      {playlistVideos.length > 0 ? `${playlistVideos.length} música${playlistVideos.length !== 1 ? 's' : ''} na playlist` : 'Nenhuma música selecionada'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 mx-4">
              <button
                onClick={toggleShuffle}
                className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                  isShuffling ? 'bg-chilli-red/30' : ''
                }`}
                title="Modo aleatório"
              >
                <Shuffle className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={playPrevious}
                disabled={playlistVideos.length <= 1}
                className="glass-effect p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
                title="Anterior"
              >
                <SkipBack className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="glass-effect p-3 rounded-full hover:scale-110 transition-transform"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                )}
              </button>

              <button
                onClick={playNext}
                disabled={playlistVideos.length <= 1}
                className="glass-effect p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
                title="Próxima"
              >
                <SkipForward className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={toggleLoop}
                className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                  isLooping ? 'bg-chilli-red/30' : ''
                }`}
                title="Repetir playlist"
              >
                <Repeat className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Playlist Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm hidden sm:block">
                {playlistVideos.length} música{playlistVideos.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`glass-effect p-2 rounded-full hover:scale-110 transition-transform ${
                  showPlaylist ? 'bg-chilli-red/30' : ''
                }`}
                title={`${showPlaylist ? 'Ocultar' : 'Mostrar'} playlist`}
              >
                <List className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Panel */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setShowPlaylist(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-black/90 rounded-xl border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div>
                  <h2 className="text-xl font-semibold text-white">Playlist Atual</h2>
                  <p className="text-white/60 text-sm">
                    {playlistVideos.length} música{playlistVideos.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {playlistVideos.length > 0 && (
                    <button
                      onClick={clearPlaylist}
                      className="glass-effect p-2 rounded-full hover:scale-110 transition-transform text-red-400"
                      title="Limpar playlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowPlaylist(false)}
                    className="glass-effect p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Playlist Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {playlistVideos.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Playlist vazia</h3>
                    <p className="text-white/60">Adicione algumas músicas para começar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {playlistVideos.map((video, index) => (
                      <div
                        key={video.id}
                        className={`group p-4 rounded-lg glass-effect hover:bg-white/10 transition-colors cursor-pointer ${
                          currentVideo?.id === video.id ? 'bg-chilli-red/20 border border-chilli-red/40' : ''
                        }`}
                        onClick={() => setCurrentVideo(video)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            {video.thumbnail ? (
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-chilli-red/40 to-chilli-red/20 flex items-center justify-center">
                                <span className="text-sm text-white">🎵</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-white font-medium truncate">{video.title}</h4>
                            <p className="text-white/60 text-sm truncate">{video.artist}</p>
                            {video.featuring && video.featuring.length > 0 && (
                              <p className="text-chilli-red/80 text-sm truncate">
                                feat. {video.featuring.join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {currentVideo?.id === video.id && (
                              <div className="w-3 h-3 bg-chilli-red rounded-full animate-pulse"></div>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFromPlaylist(video.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 glass-effect p-1 rounded-full hover:scale-110 transition-all text-red-400"
                              title="Remover da playlist"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player de vídeo (invisível mas funcional) - só renderiza se não há VideoPlayer ativo */}
      {!hideInternalPlayer && currentVideo && convertedUrl && (
        <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
          <ReactPlayer
            ref={playerRef}
            url={convertedUrl}
            playing={isPlaying}
            muted={false}
            volume={1}
            width="320px"
            height="180px"
            onEnded={handleEnded}
            onError={handleError}
            onReady={handleReady}
            onPlay={handlePlay}
            onPause={handlePause}
            onLoadStart={handleLoadStart}
            onProgress={handleProgress}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            config={getPlayerConfig()}
            light={false}
            key={`player-${currentVideo.id}-${convertedUrl}`}
          />
        </div>
      )}
    </>
  )
}
