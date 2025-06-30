'use client'

import { useEffect } from 'react'
import { notFound } from 'next/navigation'
import NavigationBar from '@/components/layout/NavigationBar'
import UniverseBackground from '@/components/layout/UniverseBackground'
import VideoPlayer from '@/components/player/VideoPlayer'
import OptimizedMusicGrid from '@/components/layout/OptimizedMusicGrid'
import Image from 'next/image'
import Link from 'next/link'
import { getVideoById, getVideosByArtist, getAllVideos } from '@/lib/videoData'
import { useParams } from 'next/navigation'
import { usePlaylist } from '@/contexts/PlaylistContextForced'
import { motion } from 'framer-motion'

// Note: metadata is handled in layout.tsx for client components
// For dynamic metadata, we would need a server component approach

export default function SongPage() {
  const params = useParams()
  const rawId = params.id as string
  
  // Fix para URLs com caracteres especiais (ex: + sendo codificado como %2B)
  const possibleIds = [
    rawId,
    decodeURIComponent(rawId),
    rawId?.replace('%2B', '+'),
    rawId?.replace('+', '%2B')
  ].filter(Boolean)
  
  // Encontrar a música testando diferentes variações do ID
  let song = null
  for (const testId of possibleIds) {
    song = getVideoById(testId)
    if (song) break
  }
  
  const { 
    setCurrentVideo,
    setPlaylist,
    addToPlaylist,
    currentVideo,
    playlist
  } = usePlaylist()

  if (!song) {
    notFound()
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Buscar outras músicas do mesmo artista para sugestões
  const otherSongs = getVideosByArtist(song.artistId)
    .filter(s => s.id !== song.id)
    .slice(0, 6) // Máximo 6 sugestões

  return (
    <>
      <UniverseBackground />
      <NavigationBar />
      
      <main className="min-h-screen relative z-10 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Video Player */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="aspect-video max-w-4xl mx-auto">
              <VideoPlayer
                video={song}
                className="w-full h-full"
                showPlaylistControls={true}
                enableAutoNext={true}
              />
            </div>
          </motion.div>

          {/* Song Info */}
          <div className="max-w-4xl mx-auto">
            
            {/* Main Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 md:p-8 rounded-lg mb-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Song Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block bg-chilli-red/20 text-chilli-red px-3 py-1 rounded-full text-sm font-semibold">
                      {song.genre}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                    {song.title}
                  </h1>
                  
                  <div className="text-xl mb-4">
                    <Link 
                      href={`/artist/${song.artistId}`}
                      className="text-white hover:text-chilli-red transition-colors"
                    >
                      {song.artist}
                    </Link>
                    {song.featuring && song.featuring.length > 0 && (
                      <span className="text-chilli-red/90">
                        {' feat. '}{song.featuring.join(', ')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6">
                    <span>Duração: {formatDuration(song.duration)}</span>
                    <span>•</span>
                    <span>Formato: {song.format.toUpperCase()}</span>
                    <span>•</span>
                    <span>Tamanho: {(song.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>

                  <p className="text-white/80 leading-relaxed">
                    Música do gênero {song.genre}. Disponível em alta qualidade através do nosso catálogo integrado com Cloudinary.
                  </p>
                </div>

                {/* Artist Image */}
                <div className="flex-shrink-0">
                  <Link href={`/artist/${song.artistId}`}>
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden glass-effect p-2 hover:scale-105 transition-transform cursor-pointer">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src={`/artists/${song.artistId}.png`}
                          alt={song.artist}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-lg mb-6"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => addToPlaylist(song)}
                  className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    📝 Adicionar à Playlist
                  </span>
                </button>

                <button className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    ❤️ Curtir
                  </span>
                </button>
                
                <button className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/20">
                  <span className="flex items-center gap-2">
                    📤 Compartilhar
                  </span>
                </button>
                
                <Link 
                  href={`/artist/${song.artistId}`}
                  className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/20 inline-flex items-center gap-2"
                >
                  👤 Ver Artista
                </Link>
              </div>
            </motion.div>

            {/* Collaborations Section */}
            {song.featuring && song.featuring.length > 0 && (
              <div className="glass-effect p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Colaborações</h3>
                <div className="flex flex-wrap gap-4">
                  {song.featuring.map((artist, index) => (
                    <div
                      key={index}
                      className="glass-effect p-4 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-chilli-red/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                          <span className="text-2xl">🎤</span>
                        </div>
                        <div className="text-sm font-medium text-white">{artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Songs */}
            {otherSongs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-effect p-6 rounded-lg mb-6"
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Mais de {song.artist}</h3>
                <OptimizedMusicGrid
                  videos={otherSongs}
                  showAddToPlaylist={true}
                  enableVirtualization={false}
                />
              </motion.div>
            )}

            {/* Playlist Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect p-6 rounded-lg text-center"
            >
              <p className="text-white/60 mb-2">
                {playlist.length} música{playlist.length !== 1 ? 's' : ''} na playlist atual
              </p>
              <p className="text-white/40 text-sm">
                Sistema de playlist ativo • Navegação automática habilitada
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-4 pb-8 pt-12">
          <div className="glass-effect p-6 mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm opacity-70 mb-4 text-white">
                © 2025 YouChilli - Todos os direitos reservados
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm flex-wrap">
                <Link 
                  href="/" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100 text-white"
                >
                  Voltar ao início
                </Link>
                
                <span className="opacity-50 text-white">•</span>
                
                <Link 
                  href={`/artist/${song.artistId}`}
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100 text-white"
                >
                  Mais de {song.artist}
                </Link>
                
                <span className="opacity-50 text-white">•</span>
                
                <Link 
                  href="/musicas"
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100 text-white"
                >
                  Todas as músicas
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
