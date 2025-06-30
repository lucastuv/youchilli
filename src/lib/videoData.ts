import videoIndex from '../data/video-index.json'

export interface VideoData {
  id: string
  title: string
  artist: string
  artistId: string
  genre: string
  cloudinaryId: string
  url: string
  duration: number
  thumbnail: string
  createdAt: string
  fileSize: number
  format: string
  featuring?: string[]
  collaboration?: string[]
}

export interface VideoIndex {
  lastUpdated: string
  totalVideos: number
  artists: Record<string, VideoData[]>
  videos: VideoData[]
}

// Cache para evitar reprocessamento desnecessário
let cachedVideos: VideoData[] | null = null
let cachedIndex: VideoIndex | null = null

// Carregar dados do índice com cache
export function getVideoIndex(): VideoIndex {
  if (cachedIndex) {
    return cachedIndex
  }
  cachedIndex = videoIndex as VideoIndex
  return cachedIndex
}

// Utilitário para testar múltiplas variações de ID (para caracteres especiais)
function getIdVariations(id: string): string[] {
  return [
    id,
    decodeURIComponent(id),
    id?.replace('%2B', '+'),
    id?.replace('+', '%2B'),
    id?.replace('%20', ' '),
    id?.replace(' ', '%20')
  ].filter(Boolean)
}

// Buscar vídeo por ID (com suporte a caracteres especiais)
export function getVideoById(id: string): VideoData | null {
  const index = getVideoIndex()
  
  // Testar múltiplas variações do ID
  const possibleIds = getIdVariations(id)
  
  for (const testId of possibleIds) {
    const video = index.videos.find(video => video.id === testId)
    if (video) return video
  }
  
  return null
}

// Buscar vídeos por artista (com suporte a caracteres especiais)
export function getVideosByArtist(artistId: string): VideoData[] {
  const index = getVideoIndex()
  
  // Testar múltiplas variações do artistId
  const possibleIds = getIdVariations(artistId)
  
  for (const testId of possibleIds) {
    const videos = index.artists[testId]
    if (videos && videos.length > 0) return videos
  }
  
  return []
}

// Buscar todos os vídeos com cache
export function getAllVideos(): VideoData[] {
  if (cachedVideos) {
    return cachedVideos
  }
  const index = getVideoIndex()
  cachedVideos = index.videos || []
  return cachedVideos
}

// Buscar vídeos por gênero
export function getVideosByGenre(genre: string): VideoData[] {
  const index = getVideoIndex()
  return index.videos.filter(video => 
    video.genre.toLowerCase() === genre.toLowerCase()
  )
}

// Buscar vídeo aleatório
export function getRandomVideo(): VideoData | null {
  const index = getVideoIndex()
  if (index.videos.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * index.videos.length)
  return index.videos[randomIndex]
}

// Buscar próximo vídeo (para playlist) - com suporte a caracteres especiais
export function getNextVideo(currentId: string): VideoData | null {
  const index = getVideoIndex()
  
  // Encontrar índice usando múltiplas variações do ID
  let currentIndex = -1
  const possibleIds = getIdVariations(currentId)
  
  for (const testId of possibleIds) {
    currentIndex = index.videos.findIndex(video => video.id === testId)
    if (currentIndex !== -1) break
  }
  
  if (currentIndex === -1) return null
  
  // Se é o último, volta para o primeiro
  const nextIndex = currentIndex + 1 >= index.videos.length ? 0 : currentIndex + 1
  return index.videos[nextIndex]
}

// Buscar vídeo anterior (para playlist) - com suporte a caracteres especiais
export function getPreviousVideo(currentId: string): VideoData | null {
  const index = getVideoIndex()
  
  // Encontrar índice usando múltiplas variações do ID
  let currentIndex = -1
  const possibleIds = getIdVariations(currentId)
  
  for (const testId of possibleIds) {
    currentIndex = index.videos.findIndex(video => video.id === testId)
    if (currentIndex !== -1) break
  }
  
  if (currentIndex === -1) return null
  
  // Se é o primeiro, vai para o último
  const prevIndex = currentIndex - 1 < 0 ? index.videos.length - 1 : currentIndex - 1
  return index.videos[prevIndex]
}

// Verificar se há colaborações internas
export function hasCollaboration(video: VideoData): boolean {
  return !!(video.collaboration && video.collaboration.length > 0)
}

// Buscar artistas colaboradores (apenas internos)
export function getCollaborators(video: VideoData): string[] {
  return video.collaboration || []
}

// Estatísticas do catálogo
export function getCatalogStats() {
  const index = getVideoIndex()
  
  return {
    totalVideos: index.totalVideos,
    totalArtists: Object.keys(index.artists).length,
    lastUpdated: index.lastUpdated,
    artists: Object.keys(index.artists).map(artistId => ({
      id: artistId,
      name: index.artists[artistId][0]?.artist || artistId,
      videoCount: index.artists[artistId].length
    }))
  }
}
