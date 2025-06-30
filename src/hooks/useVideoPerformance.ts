'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { VideoData } from '@/lib/videoData'

interface UseVideoPerformanceOptions {
  preloadNext?: boolean
  cacheSize?: number
  lazyLoadThumbnails?: boolean
}

interface VideoCache {
  [key: string]: {
    data: VideoData
    timestamp: number
    preloaded?: boolean
  }
}

export const useVideoPerformance = (options: UseVideoPerformanceOptions = {}) => {
  const { preloadNext = true, cacheSize = 10, lazyLoadThumbnails = true } = options
  
  const [videoCache, setVideoCache] = useState<VideoCache>({})
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const preloadRef = useRef<Record<string, HTMLLinkElement>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Cache management
  const addToCache = useCallback((video: VideoData, preloaded = false) => {
    setVideoCache(prev => {
      const newCache = { ...prev }
      
      // Remove oldest entries if cache is full
      const entries = Object.entries(newCache)
      if (entries.length >= cacheSize) {
        const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
        const toRemove = sortedEntries.slice(0, entries.length - cacheSize + 1)
        toRemove.forEach(([key]) => delete newCache[key])
      }
      
      newCache[video.id] = {
        data: video,
        timestamp: Date.now(),
        preloaded
      }
      
      return newCache
    })
  }, [cacheSize])

  const getFromCache = useCallback((videoId: string): VideoData | null => {
    const cached = videoCache[videoId]
    if (cached) {
      // Update timestamp for LRU
      cached.timestamp = Date.now()
      return cached.data
    }
    return null
  }, [videoCache])

  // Preload next video
  const preloadVideo = useCallback((video: VideoData) => {
    if (!preloadNext || preloadRef.current[video.id]) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = video.url
    link.as = 'video'
    
    document.head.appendChild(link)
    preloadRef.current[video.id] = link
    
    addToCache(video, true)
  }, [preloadNext, addToCache])

  // Cleanup preloaded resources
  const cleanupPreload = useCallback((videoId: string) => {
    if (preloadRef.current[videoId]) {
      document.head.removeChild(preloadRef.current[videoId])
      delete preloadRef.current[videoId]
    }
  }, [])

  // Lazy load thumbnails
  const setupLazyLoading = useCallback((container: HTMLElement) => {
    if (!lazyLoadThumbnails || observerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.removeAttribute('data-src')
              observerRef.current?.unobserve(img)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const images = container.querySelectorAll('img[data-src]')
    images.forEach(img => observerRef.current?.observe(img))
  }, [lazyLoadThumbnails])

  // Loading state management
  const setLoading = useCallback((videoId: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [videoId]: loading
    }))
  }, [])

  const isLoading = useCallback((videoId: string) => {
    return loadingStates[videoId] || false
  }, [loadingStates])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup preloaded resources
      Object.keys(preloadRef.current).forEach(cleanupPreload)
      
      // Cleanup intersection observer
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [cleanupPreload])

  return {
    // Cache methods
    addToCache,
    getFromCache,
    videoCache,
    
    // Preloading
    preloadVideo,
    cleanupPreload,
    
    // Lazy loading
    setupLazyLoading,
    
    // Loading states
    setLoading,
    isLoading,
    loadingStates,
    
    // Utils
    clearCache: () => setVideoCache({}),
    getCacheSize: () => Object.keys(videoCache).length
  }
}

// Hook for optimized video grid rendering
export const useVirtualizedGrid = (items: VideoData[], containerHeight: number, itemHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)

  const itemsPerRow = Math.floor((containerRef?.offsetWidth || 1200) / 300) // Assuming 300px per item
  const totalRows = Math.ceil(items.length / itemsPerRow)
  const visibleRows = Math.ceil(containerHeight / itemHeight) + 2 // Add buffer

  const startRow = Math.floor(scrollTop / itemHeight)
  const endRow = Math.min(startRow + visibleRows, totalRows)

  const visibleItems = items.slice(
    startRow * itemsPerRow,
    endRow * itemsPerRow
  )

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    setScrollTop(target.scrollTop)
  }, [])

  useEffect(() => {
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll)
      return () => containerRef.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, handleScroll])

  return {
    visibleItems,
    totalHeight: totalRows * itemHeight,
    offsetY: startRow * itemHeight,
    setContainerRef
  }
}

// Hook for smart image loading
export const useSmartImageLoader = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const loadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedImages.has(src)) {
        resolve()
        return
      }

      if (failedImages.has(src)) {
        reject(new Error('Image previously failed to load'))
        return
      }

      const img = new Image()
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src))
        resolve()
      }
      img.onerror = () => {
        setFailedImages(prev => new Set(prev).add(src))
        reject(new Error('Failed to load image'))
      }
      img.src = src
    })
  }, [loadedImages, failedImages])

  const isLoaded = useCallback((src: string) => {
    return loadedImages.has(src)
  }, [loadedImages])

  const hasFailed = useCallback((src: string) => {
    return failedImages.has(src)
  }, [failedImages])

  return {
    loadImage,
    isLoaded,
    hasFailed,
    loadedCount: loadedImages.size,
    failedCount: failedImages.size
  }
}
