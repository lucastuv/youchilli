'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Plus, Heart, Clock } from 'lucide-react'
import { VideoData } from '@/lib/videoData'
import { usePlaylist } from '@/contexts/PlaylistContextForced'
import { useVideoPerformance, useSmartImageLoader } from '@/hooks/useVideoPerformance'

interface OptimizedMusicGridProps {
  videos: VideoData[]
  className?: string
  showAddToPlaylist?: boolean
  enableVirtualization?: boolean
  itemsPerRow?: number
}

interface MusicCardProps {
  video: VideoData
  onPlay?: () => void
  onAddToPlaylist?: () => void
  showAddButton?: boolean
  lazy?: boolean
}

const MusicCard = ({ 
  video, 
  onPlay, 
  onAddToPlaylist, 
  showAddButton = true,
  lazy = false 
}: MusicCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { loadImage, isLoaded, hasFailed } = useSmartImageLoader()
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (video.thumbnail && !lazy) {
      loadImage(video.thumbnail).then(() => setImageLoaded(true))
    }
  }, [video.thumbnail, lazy, loadImage])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.thumbnail) {
          loadImage(video.thumbnail).then(() => setImageLoaded(true))
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [lazy, video.thumbnail, loadImage])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-effect rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-chilli-red/20 transition-all duration-500">
        {/* Thumbnail */}
        <div className="relative aspect-square overflow-hidden">
          <div
            ref={imgRef}
            className="w-full h-full bg-gradient-to-br from-chilli-red/20 to-chilli-red/40 flex items-center justify-center"
          >
            {imageLoaded && !hasFailed(video.thumbnail) ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading={lazy ? 'lazy' : 'eager'}
              />
            ) : (
              <div className="text-white/60 text-6xl">🎵</div>
            )}
          </div>

          {/* Overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
              >
                <motion.button
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPlay}
                  className="w-12 h-12 bg-chilli-red rounded-full flex items-center justify-center hover:bg-chilli-red/80 transition-colors"
                >
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                </motion.button>

                {showAddButton && (
                  <motion.button
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddToPlaylist}
                    className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Duration badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-md text-xs text-white flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <Link href={`/song/${video.id}`}>
            <h3 className="font-semibold text-white hover:text-chilli-red transition-colors truncate">
              {video.title}
            </h3>
          </Link>
          <p className="text-white/60 text-sm truncate mt-1">
            {video.artist}
            {video.featuring && video.featuring.length > 0 && (
              <span className="text-chilli-red/80">
                {' feat. '}{video.featuring.join(', ')}
              </span>
            )}
          </p>
          <p className="text-white/40 text-xs mt-1 capitalize">{video.genre}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function OptimizedMusicGrid({
  videos,
  className = '',
  showAddToPlaylist = true,
  enableVirtualization = false,
  itemsPerRow = 4
}: OptimizedMusicGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { 
    addToCache, 
    preloadVideo, 
    setupLazyLoading,
    setLoading,
    isLoading
  } = useVideoPerformance({
    preloadNext: true,
    cacheSize: 20,
    lazyLoadThumbnails: true
  })

  const { 
    setCurrentVideo, 
    setPlaylist, 
    addToPlaylist,
    currentVideo 
  } = usePlaylist()

  // Setup lazy loading when component mounts
  useEffect(() => {
    if (containerRef.current) {
      setupLazyLoading(containerRef.current)
    }
  }, [setupLazyLoading])

  // Preload next few videos
  useEffect(() => {
    const currentIndex = currentVideo ? videos.findIndex(v => v.id === currentVideo.id) : -1
    if (currentIndex >= 0) {
      // Preload next 3 videos
      for (let i = 1; i <= 3; i++) {
        const nextIndex = currentIndex + i
        if (nextIndex < videos.length) {
          preloadVideo(videos[nextIndex])
        }
      }
    }
  }, [currentVideo, videos, preloadVideo])

  const handlePlay = (video: VideoData, index: number) => {
    console.log('🎵 OptimizedMusicGrid: handlePlay', { video: video.title, index })
    setLoading(video.id, true)
    
    // Set current video and playlist
    setCurrentVideo(video)
    setPlaylist(videos, index)
    
    // Add to cache
    addToCache(video)
    
    setTimeout(() => setLoading(video.id, false), 1000)
  }

  const handleAddToPlaylist = (video: VideoData) => {
    addToPlaylist(video)
    addToCache(video)
  }

  // Virtualization (simple implementation)
  const getVisibleVideos = () => {
    if (!enableVirtualization) return videos

    // This would be more sophisticated in a real implementation
    // For now, just return all videos
    return videos
  }

  const visibleVideos = getVisibleVideos()

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {visibleVideos.map((video, index) => (
          <MusicCard
            key={video.id}
            video={video}
            onPlay={() => handlePlay(video, index)}
            onAddToPlaylist={() => handleAddToPlaylist(video)}
            showAddButton={showAddToPlaylist}
            lazy={enableVirtualization}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Loading skeleton component
export const MusicGridSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass-effect rounded-xl overflow-hidden animate-pulse">
        <div className="aspect-square bg-white/10"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-3 bg-white/10 rounded w-1/2"></div>
          <div className="h-3 bg-white/10 rounded w-1/3"></div>
        </div>
      </div>
    ))}
  </div>
)
