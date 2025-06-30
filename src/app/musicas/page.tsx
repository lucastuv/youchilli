'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import NavigationBar from '@/components/layout/NavigationBar'
import UniverseBackground from '@/components/layout/UniverseBackground'
import OptimizedMusicGrid, { MusicGridSkeleton } from '@/components/layout/OptimizedMusicGrid'
import { getAllVideos, getVideosByGenre } from '@/lib/videoData'
import { VideoData } from '@/lib/videoData'

export default function MusicPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'genre' | 'duration'>('title')
  const [isLoading, setIsLoading] = useState(false)

  const allVideos = getAllVideos()
  
  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(allVideos.map(video => video.genre))
    return ['all', ...Array.from(genreSet)]
  }, [allVideos])

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = allVideos

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.featuring && video.featuring.some(feat => 
          feat.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(video => video.genre === selectedGenre)
    }

    // Sort videos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'artist':
          return a.artist.localeCompare(b.artist)
        case 'genre':
          return a.genre.localeCompare(b.genre)
        case 'duration':
          return (a.duration || 0) - (b.duration || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [allVideos, searchTerm, selectedGenre, sortBy])

  return (
    <>
      <UniverseBackground />
      <NavigationBar />
      
      <div className="min-h-screen pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Biblioteca de <span className="text-chilli-red">Músicas</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore nossa coleção completa de músicas latinas com sistema de playlist integrado e otimizações de performance.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar músicas, artistas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-chilli-red/50 transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                {/* Genre Filter */}
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-chilli-red/50"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre} className="bg-black">
                      {genre === 'all' ? 'Todos os gêneros' : genre}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-chilli-red/50"
                >
                  <option value="title" className="bg-black">Título</option>
                  <option value="artist" className="bg-black">Artista</option>
                  <option value="genre" className="bg-black">Gênero</option>
                  <option value="duration" className="bg-black">Duração</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center gap-2 glass-effect rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-chilli-red text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-chilli-red text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-white/60">
              {filteredVideos.length} de {allVideos.length} música{filteredVideos.length !== 1 ? 's' : ''}
              {searchTerm && ` • Resultados para "${searchTerm}"`}
              {selectedGenre !== 'all' && ` • Gênero: ${selectedGenre}`}
            </p>
          </motion.div>

          {/* Music Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isLoading ? (
              <MusicGridSkeleton count={12} />
            ) : filteredVideos.length > 0 ? (
              <OptimizedMusicGrid
                videos={filteredVideos}
                showAddToPlaylist={true}
                enableVirtualization={filteredVideos.length > 50}
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhuma música encontrada</h3>
                <p className="text-white/60">Tente ajustar os filtros ou termos de busca</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
