'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PlayerStateContextType {
  hasActiveVideoPlayer: boolean
  setHasActiveVideoPlayer: (active: boolean) => void
  globalHasUserInteracted: boolean
  setGlobalHasUserInteracted: (interacted: boolean) => void
}

const PlayerStateContext = createContext<PlayerStateContextType | undefined>(undefined)

export function PlayerStateProvider({ children }: { children: ReactNode }) {
  const [hasActiveVideoPlayer, setHasActiveVideoPlayer] = useState(false)
  const [globalHasUserInteracted, setGlobalHasUserInteracted] = useState(false)

  return (
    <PlayerStateContext.Provider value={{
      hasActiveVideoPlayer,
      setHasActiveVideoPlayer,
      globalHasUserInteracted,
      setGlobalHasUserInteracted
    }}>
      {children}
    </PlayerStateContext.Provider>
  )
}

export function usePlayerState() {
  const context = useContext(PlayerStateContext)
  if (context === undefined) {
    throw new Error('usePlayerState must be used within a PlayerStateProvider')
  }
  return context
}
