'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  clickable?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'lg', 
  animated = true, 
  clickable = true,
  className = '' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])

  useEffect(() => {
    // Simula carregamento da página
    const timer = setTimeout(() => setIsLoaded(true), 500)
    
    // Gera partículas cósmicas ao redor da logo
    const newParticles = Array.from({length: 15}, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 100 - 50,
      delay: Math.random() * 3
    }))
    setParticles(newParticles)
    
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-6xl md:text-8xl',
    lg: 'text-8xl md:text-9xl lg:text-[10rem]',
    xl: 'text-7xl md:text-8xl lg:text-[10rem]'
  }

  const signatureSizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl lg:text-3xl',
    xl: 'text-2xl md:text-3xl lg:text-4xl'
  }

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -90
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const signatureVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }

  const handleClick = () => {
    if (clickable) {
      window.open('https://github.com/lucastuv', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div 
      className={`text-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      onClick={handleClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      {/* Logo Principal */}
      <div className={`font-bold tracking-wider ${sizeClasses[size]} relative ${
        size === 'sm' ? 'flex items-center gap-1' : ''
      }`}>
        {/* Design especial para navbar (size sm) */}
        {size === 'sm' ? (
          <>
            {/* Pepper SVG real pequeno */}
            <div className="w-6 h-6 flex-shrink-0">
              <motion.svg 
                viewBox="0 0 1024 1024" 
                className="w-full h-full drop-shadow-sm"
                animate={{
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path d="M161.597 850.945c120.85 24.006 216.772 10.323 272.34-2.196 46.539-10.488 284.518-69.271 386.371-273.361 22.555-45.201 62.66-125.529 29.375-202.718-39.863-92.386-151.961-113.417-163.063-115.306-22.577-3.844-102.128-13.87-163.986 33.175-81.68 62.166-54.127 164.468-97.088 283.167-28.661 79.187-94.836 182.732-263.949 277.237z" fill="#FA1919" />
                <path d="M433.935 848.75c1.835 4.14 219.981-33.933 348.222-209.252 17.395-23.787 114.207-156.1 67.524-266.849-15.77-37.425-48.319-73.28-65.438-67.514-24.631 8.302 7.403 94.374-19.228 205.353-23.907 99.7-82.032 164.952-106.629 192.57-101.985 114.525-225.844 142.528-224.449 145.69z" fill="#C40000" />
                <path d="M838.799 361.371c0.737-1.85 1.164-3.992 1.164-6.236 0-0.531-0.023-1.056-0.070-1.574-45.864-76.221-142.973-94.428-153.263-96.186-12.998-2.287-27.965-3.593-43.237-3.593-9.956 0-19.782 0.556-29.452 1.638-7.014 1.868-13.088 5.383-15.91 12.399-10.685 26.356 34.218 74.092 79.703 97.098 64.252 32.494 149.917 25.861 161.064-3.547z" fill="#C40000" />
                <path d="M587.072 245.859c-10.686 26.356 34.219 74.092 79.703 97.098 64.219 32.494 149.897 25.851 161.043-3.547 10.828-28.552-58.201-53.545-55.554-111.682 1.911-42.684 40.335-63.637 29.386-101.545-3.909-13.573-14.935-31.165-26.861-31.023-24.248 0.297-19.92 69.71-68.415 109.507-49.010 40.225-108.166 13.771-119.302 41.192z" fill="#6BE166" />
                <path d="M828.422 328.757c-5.963-24.698-58.433-50.185-56.159-101.030 0.395-8.155 2.030-15.812 4.72-22.948 1.165-14.652 10.84-29.532 20.866-41.423 4.294-9.499 6.918-19.239 5.293-30.397-10.985 4.529-20.215 11.368-27.428 19.957-35.155 24.715-17.804 115.049-16.607 120.935 5.118 25.081 10.982 27.531 14.826 56.005 1.266 9.027 1.988 19.456 1.988 30.053 0 1.376-0.012 2.749-0.036 4.118 26.643-2.677 46.915-11.318 51.955-24.617 0.396-2.558 0.622-5.51 0.622-8.514 0-0.752-0.014-1.5-0.043-2.244z" fill="#5BBF57" />
              </motion.svg>
            </div>
            {/* Texto horizontal compacto */}
            <div className="flex items-baseline">
              <motion.span 
                className="text-you-white font-semibold"
                variants={letterVariants}
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                YOU
              </motion.span>
              <motion.span 
                className="text-chilli-red font-semibold"
                variants={letterVariants}
                style={{
                  textShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                }}
              >
                CHILLI
              </motion.span>
            </div>
          </>
        ) : (
          /* Design revolucionário para tamanhos grandes */
          <div className="relative inline-block">
            {/* Partículas cósmicas flutuantes */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                style={{
                  left: `${50 + particle.x}%`,
                  top: `${50 + particle.y}%`,
                  boxShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(0,255,255,0.4)'
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay
                }}
              />
            ))}

            <div className="flex items-baseline justify-center relative z-10">
              <motion.span 
                className="text-you-white relative overflow-hidden z-5"
                variants={letterVariants}
                style={{
                  background: `linear-gradient(135deg, 
                    #ffffff 0%, 
                    #00ffff 15%, 
                    #0080ff 30%, 
                    #ffffff 45%, 
                    #00ffff 60%, 
                    #0040ff 75%, 
                    #ffffff 90%, 
                    #00ffff 100%
                  )`,
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3))',
                  position: 'relative'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  filter: [
                    'drop-shadow(0 0 15px rgba(0,255,255,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3))',
                    'drop-shadow(0 0 30px rgba(0,255,255,1)) drop-shadow(0 0 50px rgba(255,255,255,0.6))',
                    'drop-shadow(0 0 15px rgba(0,255,255,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3))'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                YOU
                
                {/* Pulsos de energia lateral esquerda */}
                <motion.div
                  className="absolute -left-8 top-1/2 pointer-events-none"
                  style={{
                    width: '150px',
                    height: '6px',
                    background: `linear-gradient(90deg, 
                      rgba(0,255,255,0.9) 0%, 
                      rgba(0,255,255,0.6) 30%, 
                      rgba(0,255,255,0.3) 60%, 
                      transparent 100%
                    )`,
                    borderRadius: '3px',
                    transformOrigin: 'left center'
                  }}
                  animate={{
                    scaleX: [0, 2, 0],
                    opacity: [0, 1, 0],
                    y: [0, -10, 0],
                    filter: [
                      'blur(0px) brightness(1)',
                      'blur(2px) brightness(1.5)',
                      'blur(0px) brightness(1)'
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />
              </motion.span>
              
              <motion.span 
                className="text-chilli-red ml-3 relative overflow-hidden z-5"
                variants={letterVariants}
                style={{
                  background: `linear-gradient(135deg, 
                    #ff0000 0%, 
                    #ff6600 15%, 
                    #ff0033 30%, 
                    #ff3300 45%, 
                    #ff6600 60%, 
                    #ff0000 75%, 
                    #ff9900 90%, 
                    #ff0000 100%
                  )`,
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(255,100,0,0.8)) drop-shadow(0 0 40px rgba(255,0,0,0.4))',
                  position: 'relative'
                }}
                animate={{
                  backgroundPosition: ['100% 100%', '0% 0%', '100% 100%'],
                  filter: [
                    'drop-shadow(0 0 20px rgba(255,100,0,0.8)) drop-shadow(0 0 40px rgba(255,0,0,0.4))',
                    'drop-shadow(0 0 40px rgba(255,100,0,1.2)) drop-shadow(0 0 80px rgba(255,0,0,0.8))',
                    'drop-shadow(0 0 20px rgba(255,100,0,0.8)) drop-shadow(0 0 40px rgba(255,0,0,0.4))'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                CHILLI
                
                {/* Pulsos de energia lateral direita */}
                <motion.div
                  className="absolute -right-8 top-1/2 pointer-events-none"
                  style={{
                    width: '150px',
                    height: '6px',
                    background: `linear-gradient(270deg, 
                      rgba(255,100,0,0.9) 0%, 
                      rgba(255,100,0,0.6) 30%, 
                      rgba(255,100,0,0.3) 60%, 
                      transparent 100%
                    )`,
                    borderRadius: '3px',
                    transformOrigin: 'right center'
                  }}
                  animate={{
                    scaleX: [0, 2, 0],
                    opacity: [0, 1, 0],
                    y: [0, 10, 0],
                    filter: [
                      'blur(0px) brightness(1)',
                      'blur(2px) brightness(1.5)',
                      'blur(0px) brightness(1)'
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.8
                  }}
                />
                
                {/* Equalizer de alta tecnologia embaixo */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ 
                        height: '3px',
                        background: `linear-gradient(to top, 
                          #ff0000 0%, 
                          #ff6600 50%, 
                          #ffff00 100%
                        )`,
                        boxShadow: `0 0 4px rgba(255,${100 + i * 10},0,0.8)`
                      }}
                      animate={{
                        height: ['3px', `${Math.random() * 30 + 15}px`, '3px'],
                        opacity: [0.4, 1, 0.4],
                        boxShadow: [
                          `0 0 4px rgba(255,${100 + i * 10},0,0.8)`,
                          `0 0 12px rgba(255,${100 + i * 10},0,1)`,
                          `0 0 4px rgba(255,${100 + i * 10},0,0.8)`
                        ]
                      }}
                      transition={{
                        duration: 0.3 + Math.random() * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.08
                      }}
                    />
                  ))}
                </div>
              </motion.span>
              
              {/* SVG da Pimenta posicionado ao lado direito do CHILLI */}
              <div className="ml-4 flex items-center" style={{ zIndex: 10000, pointerEvents: 'none' }}>
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ zIndex: 10000, position: 'relative' }}
                >
                  <motion.svg 
                    width={size === 'xl' ? 50 : 40}
                    height={size === 'xl' ? 50 : 40}
                    viewBox="0 0 1024 1024" 
                    className="drop-shadow-lg"
                    style={{ zIndex: 10000, position: 'relative', display: 'block' }}
                    animate={{
                      filter: [
                        'drop-shadow(0 0 8px rgba(255,0,0,0.6)) drop-shadow(0 0 16px rgba(255,100,0,0.4))',
                        'drop-shadow(0 0 16px rgba(255,0,0,1)) drop-shadow(0 0 32px rgba(255,100,0,0.8))',
                        'drop-shadow(0 0 8px rgba(255,0,0,0.6)) drop-shadow(0 0 16px rgba(255,100,0,0.4))'
                      ],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M161.597 850.945c120.85 24.006 216.772 10.323 272.34-2.196 46.539-10.488 284.518-69.271 386.371-273.361 22.555-45.201 62.66-125.529 29.375-202.718-39.863-92.386-151.961-113.417-163.063-115.306-22.577-3.844-102.128-13.87-163.986 33.175-81.68 62.166-54.127 164.468-97.088 283.167-28.661 79.187-94.836 182.732-263.949 277.237z" fill="#FA1919" />
                    <path d="M433.935 848.75c1.835 4.14 219.981-33.933 348.222-209.252 17.395-23.787 114.207-156.1 67.524-266.849-15.77-37.425-48.319-73.28-65.438-67.514-24.631 8.302 7.403 94.374-19.228 205.353-23.907 99.7-82.032 164.952-106.629 192.57-101.985 114.525-225.844 142.528-224.449 145.69z" fill="#C40000" />
                    <path d="M838.799 361.371c0.737-1.85 1.164-3.992 1.164-6.236 0-0.531-0.023-1.056-0.070-1.574-45.864-76.221-142.973-94.428-153.263-96.186-12.998-2.287-27.965-3.593-43.237-3.593-9.956 0-19.782 0.556-29.452 1.638-7.014 1.868-13.088 5.383-15.91 12.399-10.685 26.356 34.218 74.092 79.703 97.098 64.252 32.494 149.917 25.861 161.064-3.547z" fill="#C40000" />
                    <path d="M587.072 245.859c-10.686 26.356 34.219 74.092 79.703 97.098 64.219 32.494 149.897 25.851 161.043-3.547 10.828-28.552-58.201-53.545-55.554-111.682 1.911-42.684 40.335-63.637 29.386-101.545-3.909-13.573-14.935-31.165-26.861-31.023-24.248 0.297-19.92 69.71-68.415 109.507-49.010 40.225-108.166 13.771-119.302 41.192z" fill="#6BE166" />
                    <path d="M828.422 328.757c-5.963-24.698-58.433-50.185-56.159-101.030 0.395-8.155 2.030-15.812 4.72-22.948 1.165-14.652 10.84-29.532 20.866-41.423 4.294-9.499 6.918-19.239 5.293-30.397-10.985 4.529-20.215 11.368-27.428 19.957-35.155 24.715-17.804 115.049-16.607 120.935 5.118 25.081 10.982 27.531 14.826 56.005 1.266 9.027 1.988 19.456 1.988 30.053 0 1.376-0.012 2.749-0.036 4.118 26.643-2.677 46.915-11.318 51.955-24.617 0.396-2.558 0.622-5.51 0.622-8.514 0-0.752-0.014-1.5-0.043-2.244z" fill="#5BBF57" />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
            
            {/* Assinatura posicionada no canto inferior direito da logo */}
            {(size === 'xl' || size === 'lg') && (
              <motion.div
                variants={signatureVariants}
                className="elegant-signature absolute bottom-0 right-0"
                style={{
                  fontFamily: 'var(--font-dancing-script), "Dancing Script", "Pacifico", "Great Vibes", "Satisfy", "Kaushan Script", cursive',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: size === 'xl' ? '1.4rem' : '1.2rem',
                  fontWeight: '600',
                  opacity: 0.8,
                  transform: 'translateY(-0.5rem) translateX(-0.5rem) rotate(-3deg)',
                  letterSpacing: '0.06em',
                  textRendering: 'optimizeLegibility',
                  zIndex: 1000
                }}
              >
                <em style={{ fontStyle: 'italic', fontFamily: '"Dancing Script", cursive' }}>By Lucas Pimenta</em>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Assinatura removida daqui pois agora está integrada na logo */}

    </motion.div>
  )
}

export default Logo
