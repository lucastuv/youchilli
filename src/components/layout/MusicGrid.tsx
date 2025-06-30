'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { VideoData, getAllVideos, getVideosByArtist } from '../../lib/videoData'

interface MusicGridProps {
  videos?: VideoData[]
  artistId?: string
  artistName?: string
  className?: string
  columns?: 1 | 2 | 3 | 4
  maxItems?: number
}

export default function MusicGrid({
  videos,
  artistId,
  artistName,
  className = '',
  columns = 3,
  maxItems
}: MusicGridProps) {
  const router = useRouter()
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Determinar quais vídeos exibir
  const displayVideos = (() => {
    if (videos) {
      return maxItems ? videos.slice(0, maxItems) : videos
    }
    
    if (artistId) {
      const artistVideos = getVideosByArtist(artistId)
      return maxItems ? artistVideos.slice(0, maxItems) : artistVideos
    }
    
    const allVideos = getAllVideos()
    return maxItems ? allVideos.slice(0, maxItems) : allVideos
  })()

  // Função para formatar duração
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleSongClick = (video: VideoData) => {
    setPlayingId(video.id)
    router.push(`/song/${video.id}`)
  }

  // Se não há vídeos para exibir
  if (displayVideos.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="glass-effect p-8 rounded-lg text-center">
          <div className="text-white/60 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm12-3c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM9 10l12-3" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">
            {artistName ? `Nenhuma música de ${artistName} encontrada` : 'Nenhuma música encontrada'}
          </h3>
          <p className="text-white/50 text-sm">
            Tente executar o script de mapeamento do Cloudinary para atualizar o catálogo.
          </p>
        </div>
      </div>
    )
  }

  // Grid responsivo baseado na prop columns
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={`${className}`}>
      {artistName && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Músicas de {artistName}
          </h2>
          <p className="text-white/60">
            {displayVideos.length} música{displayVideos.length !== 1 ? 's' : ''} disponível{displayVideos.length !== 1 ? 'is' : ''}
          </p>
        </div>
      )}

      <div className={`grid ${gridClasses[columns]} gap-4 md:gap-6`}>
        {displayVideos.map((video, index) => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => handleSongClick(video)}
          >
            <div className="glass-effect p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              
              {/* Thumbnail */}
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-chilli-red/20 to-purple-600/20">
                {video.thumbnail ? (
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} - ${video.artist}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1 group-hover:text-chilli-red transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-white/70 text-xs md:text-sm">
                  {video.artist}
                  {video.featuring && video.featuring.length > 0 && (
                    <span className="text-white/50">
                      {' feat. '}{video.featuring.join(', ')}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="bg-chilli-red/20 text-chilli-red px-2 py-1 rounded-full">
                    {video.genre}
                  </span>
                  
                  <span>
                    {video.format.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
