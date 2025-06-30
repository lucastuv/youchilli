'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

interface Star {
  id: number
  left: number
  top: number
  duration: number
  delay: number
}

const UniverseBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [stars, setStars] = useState<Star[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Marcar como cliente após montagem para evitar hydration mismatch
    setIsClient(true)

    // Atualizar dimensões da tela
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Segundo useEffect para gerar elementos após isClient ser true
  useEffect(() => {
    if (!isClient) return

    // Gerar partículas
    const generateParticles = () => {
      const newParticles: Particle[] = []
      // Reduzir partículas em dispositivos móveis para melhor performance
      const isMobile = window.innerWidth < 768
      const particleCount = Math.min(
        isMobile ? 15 : 50, 
        Math.floor(window.innerWidth / (isMobile ? 50 : 30))
      )

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
        })
      }

      setParticles(newParticles)
    }

    // Gerar estrelas de fundo
    const generateStars = () => {
      const newStars: Star[] = []
      const starCount = window.innerWidth < 768 ? 50 : 100 // Menos estrelas em mobile
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2
        })
      }
      setStars(newStars)
    }

    generateParticles()
    generateStars()
  }, [isClient])

  const particleVariants = {
    animate: (particle: Particle) => ({
      y: [particle.y, particle.y - window.innerHeight - 100],
      x: [
        particle.x,
        particle.x + (Math.random() - 0.5) * 100
      ],
      opacity: [0, particle.opacity, particle.opacity, 0],
      transition: {
        duration: particle.speed * 20,
        repeat: Infinity,
        ease: 'linear'
      }
    })
  }

  // Não renderizar nada no servidor para evitar hydration mismatch
  if (!isClient) {
    return <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black -z-10" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Stars - Smaller and more subtle */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Animated Particles - Reduced for performance */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
            custom={particle}
            variants={particleVariants}
            animate="animate"
          />
        ))}
      </div>

      {/* Chilli Red Glow Effects - Subtle and performance-optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chilli-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chilli-red/3 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-chilli-red/4 rounded-full blur-2xl" />
      </div>
    </div>
  )
}

export default UniverseBackground
