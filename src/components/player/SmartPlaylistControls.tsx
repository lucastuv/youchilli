'use client'

import PlaylistControls from './PlaylistControls'
import { usePlayerState } from '../../contexts/PlayerStateContext'

export default function SmartPlaylistControls() {
  const { hasActiveVideoPlayer } = usePlayerState()
  
  return (
    <PlaylistControls 
      hideInternalPlayer={hasActiveVideoPlayer}
    />
  )
}
