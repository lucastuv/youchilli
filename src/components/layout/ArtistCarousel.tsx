'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Artist {
  id: string
  name: string
  genre: string
  image: string
}

const artists: Artist[] = [
  {
    id: 'peso-pluma',
    name: 'Peso Pluma',
    genre: 'Corridos Tumbados',
    image: '/artists/peso-pluma.png'
  },
  {
    id: 'maluma',
    name: 'Maluma',
    genre: 'Reggaeton',
    image: '/artists/maluma.png'
  },
  {
    id: 'clave-especial',
    name: 'Clave Especial',
    genre: 'Regional Mexicano',
    image: '/artists/clave-especial.png'
  },
  {
    id: 'plan-b',
    name: 'Plan B',
    genre: 'Reggaeton',
    image: '/artists/plan-b.png'
  },
  {
    id: 'bad-bunny',
    name: 'Bad Bunny',
    genre: 'Latin Trap',
    image: '/artists/bad-bunny.png'
  },
  {
    id: 'j-balvin',
    name: 'J Balvin',
    genre: 'Reggaeton',
    image: '/artists/j-balvin.png'
  }
]

interface ArtistCarouselProps {
  className?: string
}

export default function ArtistCarousel({ className = '' }: ArtistCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  
  // Auto-scroll do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Loop infinito - volta para 0 quando chega no final
        return prevIndex === artists.length - 1 ? 0 : prevIndex + 1
      })
    }, 3000) // Muda a cada 3 segundos
    
    return () => clearInterval(interval)
  }, [])

  // Duplicamos os artistas para criar efeito de loop suave
  const duplicatedArtists = [...artists, ...artists]

  const handleArtistClick = (artistId: string) => {
    router.push(`/artist/${artistId}`)
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Título discreto */}
        <div className="text-center mb-4">
          <h2 className="text-sm md:text-base font-light text-white/50 mb-1">
            Artistas em Destaque
          </h2>
          <div className="w-8 h-0.5 bg-chilli-red mx-auto opacity-30"></div>
        </div>

        {/* Container do carrossel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out gap-2"
            style={{
              transform: `translateX(-${currentIndex * (100 / 6)}%)`,
              width: `${duplicatedArtists.length * (100 / 6)}%`
            }}
          >
            {duplicatedArtists.map((artist, index) => (
              <div
                key={`${artist.id}-${index}`}
                className="w-1/6 flex-shrink-0"
              >
                <div 
                  className="glass-effect p-2 hover:scale-105 transition-all duration-300 cursor-pointer group rounded-md"
                  onClick={() => handleArtistClick(artist.id)}
                >
                  {/* Imagem do artista */}
                  <div className="relative w-full aspect-square mb-1 overflow-hidden rounded-sm">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 16vw, (max-width: 1200px) 14vw, 12vw"
                      priority={index < 6}
                    />
                    {/* Overlay com gradiente mais sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Informações do artista */}
                  <div className="text-center">
                    <h3 className="font-medium text-xs group-hover:text-chilli-red transition-colors truncate leading-tight">
                      {artist.name}
                    </h3>
                    <p className="text-xs opacity-40 group-hover:opacity-60 transition-opacity truncate leading-tight">
                      {artist.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de progresso (ultra discretos) */}
        <div className="flex justify-center mt-3 gap-1">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-chilli-red scale-150'
                  : 'bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Ir para artista ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
