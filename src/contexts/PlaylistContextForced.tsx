'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { VideoData } from '@/lib/videoData'

interface PlaylistContextType {
  currentVideo: VideoData | null
  playlist: VideoData[]
  isPlaying: boolean
  setCurrentVideo: (video: VideoData) => void
  setPlaylist: (videos: VideoData[], startIndex?: number) => void
  togglePlay: () => void
  playNext: () => void
  playPrevious: () => void
  addToPlaylist: (video: VideoData) => void
  removeFromPlaylist: (videoId: string) => void
  clearPlaylist: () => void
  currentIndex: number
  isLooping: boolean
  isShuffling: boolean
  toggleLoop: () => void
  toggleShuffle: () => void
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)

interface PlaylistProviderProps {
  children: React.ReactNode
}

export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
  // Estados com valores iniciais e forçar re-render
  const [state, setState] = useState({
    currentVideo: null as VideoData | null,
    playlist: [] as VideoData[],
    currentIndex: 0,
    isPlaying: false,
    isLooping: false,
    isShuffling: false
  })

  // Force render counter
  const [renderTrigger, setRenderTrigger] = useState(0)

  // Helper para forçar re-render
  const forceUpdate = () => {
    setRenderTrigger(prev => prev + 1)
  }

  // Estado atual (sem auto-init)

  const setCurrentVideo = (video: VideoData) => {
    setState(prev => ({
      ...prev,
      currentVideo: video,
      isPlaying: false // Não iniciar automaticamente
    }))
    
    // Force re-render after state change
    setTimeout(() => forceUpdate(), 0)
  }

  const setPlaylist = (videos: VideoData[], startIndex = 0) => {
    setState(prev => {
      const newState = {
        ...prev,
        playlist: videos,
        currentIndex: startIndex,
        currentVideo: videos.length > 0 && startIndex < videos.length ? videos[startIndex] : null,
        isPlaying: false // Não iniciar automaticamente
      }
      
      return newState
    })
    
    // Force re-render after state change
    setTimeout(() => forceUpdate(), 0)
  }

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
    forceUpdate()
  }

  const playNext = () => {
    setState(prev => {
      if (prev.playlist.length === 0) return prev
      
      let nextIndex: number
      if (prev.isShuffling) {
        nextIndex = Math.floor(Math.random() * prev.playlist.length)
      } else {
        nextIndex = prev.currentIndex + 1
        if (nextIndex >= prev.playlist.length) {
          nextIndex = prev.isLooping ? 0 : prev.playlist.length - 1
        }
      }
      
      return {
        ...prev,
        currentIndex: nextIndex,
        currentVideo: prev.playlist[nextIndex],
        isPlaying: prev.isPlaying // Manter estado atual de reprodução
      }
    })
    forceUpdate()
  }

  const playPrevious = () => {
    setState(prev => {
      if (prev.playlist.length === 0) return prev
      
      let prevIndex: number
      if (prev.isShuffling) {
        prevIndex = Math.floor(Math.random() * prev.playlist.length)
      } else {
        prevIndex = prev.currentIndex - 1
        if (prevIndex < 0) {
          prevIndex = prev.isLooping ? prev.playlist.length - 1 : 0
        }
      }
      
      return {
        ...prev,
        currentIndex: prevIndex,
        currentVideo: prev.playlist[prevIndex],
        isPlaying: prev.isPlaying // Manter estado atual de reprodução
      }
    })
    forceUpdate()
  }

  const addToPlaylist = (video: VideoData) => {
    setState(prev => {
      if (prev.playlist.find(v => v.id === video.id)) {
        return prev // Já existe
      }
      return { ...prev, playlist: [...prev.playlist, video] }
    })
    forceUpdate()
  }

  const removeFromPlaylist = (videoId: string) => {
    setState(prev => ({
      ...prev,
      playlist: prev.playlist.filter(v => v.id !== videoId)
    }))
    forceUpdate()
  }

  const clearPlaylist = () => {
    setState({
      currentVideo: null,
      playlist: [],
      currentIndex: 0,
      isPlaying: false,
      isLooping: false,
      isShuffling: false
    })
    forceUpdate()
  }

  const toggleLoop = () => {
    setState(prev => ({ ...prev, isLooping: !prev.isLooping }))
    forceUpdate()
  }

  const toggleShuffle = () => {
    setState(prev => ({ ...prev, isShuffling: !prev.isShuffling }))
    forceUpdate()
  }

  const value: PlaylistContextType = {
    currentVideo: state.currentVideo,
    playlist: state.playlist,
    currentIndex: state.currentIndex,
    isPlaying: state.isPlaying,
    isLooping: state.isLooping,
    isShuffling: state.isShuffling,
    setCurrentVideo,
    setPlaylist,
    togglePlay,
    playNext,
    playPrevious,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    toggleLoop,
    toggleShuffle,
  }

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}
