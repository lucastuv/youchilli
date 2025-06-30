'use client'

import { useState, useEffect } from 'react'

interface HeroSectionProps {
  className?: string
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  
  const features = [
    "Descubra os maiores hits da música latina",
    "Streaming de alta qualidade com Cloudinary",
    "Interface moderna e responsiva",
    "Navegação fluida entre artistas e músicas"
  ]

  // Rotação automática das features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [features.length])

  const handleExploreClick = () => {
    // Scroll suave para o carrossel de artistas
    const carousel = document.querySelector('#artist-carousel')
    if (carousel) {
      carousel.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }



  return (
    <section className={`flex flex-col items-center justify-center text-center px-4 ${className}`}>
      {/* Heading principal */}
      <div className="max-w-4xl mb-8">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Bem-vindo ao{' '}
          <span className="text-chilli-red">
            YouChilli
          </span>
        </h1>
        
        {/* Feature rotativa */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <p className="text-lg md:text-xl lg:text-2xl opacity-80 font-light transition-all duration-1000">
            {features[currentFeature]}
          </p>
        </div>
      </div>

      {/* Indicadores das features */}
      <div className="flex gap-2 mb-8">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFeature(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentFeature
                ? 'bg-chilli-red w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Feature ${index + 1}`}
          />
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={handleExploreClick}
          className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300 group"
        >
          <span className="flex items-center gap-2">
            🎵 Explorar Artistas
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Stats/Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">🎤</div>
          <div className="text-xl font-semibold text-chilli-red mb-1">6+</div>
          <div className="text-sm opacity-70">Artistas</div>
        </div>

        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">🎵</div>
          <div className="text-xl font-semibold text-chilli-red mb-1">50+</div>
          <div className="text-sm opacity-70">Músicas</div>
        </div>

        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">🌶️</div>
          <div className="text-xl font-semibold text-chilli-red mb-1">100%</div>
          <div className="text-sm opacity-70">Chilli</div>
        </div>
      </div>
    </section>
  )
}
