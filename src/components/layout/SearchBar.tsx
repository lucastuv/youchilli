'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { performSearch, SearchResult } from '../../lib/search'

interface SearchBarProps {
  className?: string
  onClose?: () => void
}

export default function SearchBar({ className = '', onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Busca em tempo real usando o sistema real
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = performSearch(query.trim())
      setResults(searchResults)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
      onClose?.()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectResult(results[selectedIndex])
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    console.log('Resultado selecionado:', result)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
    
    // Navegar para a página apropriada
    if (result.url) {
      router.push(result.url)
    }
    
    // Fechar o componente se for um modal/overlay
    onClose?.()
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Campo de busca */}
      <div className="relative">
        <div className="glass-effect flex items-center px-4 py-3 rounded-full transition-all duration-300">
          <MagnifyingGlassIcon className="w-5 h-5 text-white/70 mr-3 flex-shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar artistas ou músicas..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm md:text-base"
          />
          
          {query && (
            <button
              onClick={clearSearch}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <XMarkIcon className="w-4 h-4 text-white/70" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown de resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="glass-effect rounded-lg overflow-hidden max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                {/* Ícone do tipo */}
                <div className="w-10 h-10 rounded-full bg-chilli-red/20 flex items-center justify-center mr-3 flex-shrink-0">
                  {result.type === 'artist' ? (
                    <span className="text-chilli-red text-sm font-semibold">👤</span>
                  ) : result.type === 'song' ? (
                    <span className="text-chilli-red text-sm font-semibold">🎵</span>
                  ) : (
                    <span className="text-chilli-red text-sm font-semibold">🎭</span>
                  )}
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {result.title}
                  </div>
                  <div className="text-white/60 text-xs truncate">
                    {result.subtitle}
                  </div>
                </div>

                {/* Badge do tipo */}
                <div className="ml-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    result.type === 'artist'
                      ? 'bg-blue-500/20 text-blue-300'
                      : result.type === 'song'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {result.type === 'artist' ? 'Artista' : result.type === 'song' ? 'Música' : 'Gênero'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estado sem resultados */}
      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="glass-effect rounded-lg p-4 text-center">
            <div className="text-white/60 text-sm">
              Nenhum resultado encontrado para "{query}"
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
