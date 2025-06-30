'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UniverseBackground from '@/components/layout/UniverseBackground'
import ReactPlayer from 'react-player'

export default function EspecialPage() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([])
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; type: string }>>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showSurprise, setShowSurprise] = useState(false)

  // Frases românticas aleatórias
  const romanticQuotes = [
    "Você é a melodia mais bonita que já ouvi 🎵",
    "Em cada linha de código, há um verso de amor por você 💻💕",
    "Seu sorriso é meu framework favorito 😊",
    "Se o amor fosse uma linguagem de programação, você seria minha sintaxe perfeita 👩‍💻",
    "Você faz meu coração dar commit sem conflitos 💖",
    "Nosso amor é como um deployment perfeito: sempre funcionando ✨",
    "Você é minha constante favorita no universo das variáveis 🌟"
  ]

  // Mensagem baseada no horário
  const getTimeBasedMessage = () => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) return "Bom dia, meu amor! ☀️"
    if (hour >= 12 && hour < 18) return "Boa tarde, minha vida! 🌤️"
    if (hour >= 18 && hour < 22) return "Boa noite, meu coração! 🌅"
    return "Boa madrugada, meu anjo! 🌙"
  }

  const handlePlayMusic = () => {
    setShowPlayer(true)
    setIsPlaying(true)
  }

  const handleStopMusic = () => {
    setIsPlaying(false)
    setShowPlayer(false)
  }

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * romanticQuotes.length)
    setCurrentQuote(randomIndex)
  }

  const toggleSurprise = () => {
    setShowSurprise(!showSurprise)
  }

  // Gerar corações e pétalas flutuantes
  useEffect(() => {
    const heartArray = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setHearts(heartArray)

    const petalArray = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      type: ['🌸', '🌺', '🌹', '💐'][Math.floor(Math.random() * 4)]
    }))
    setPetals(petalArray)
  }, [])

  return (
    <>
      <UniverseBackground />
      
      {/* Player de música flutuante */}
      {showPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          className="fixed bottom-32 right-6 z-50 glass-effect p-6 rounded-xl shadow-2xl border border-red-300/30"
          style={{ width: '350px' }}
        >
          {/* Header do player */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: isPlaying ? [0, 360] : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                <span className="text-2xl">💖</span>
              </motion.div>
              <div>
                <h4 className="font-bold text-white text-lg">TU TU TU</h4>
                <p className="text-sm text-white/80">Clave Especial</p>
                <p className="text-xs text-red-300 font-medium">♪ Música Especial ♪</p>
              </div>
            </div>
            
            {/* Controles do player */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-lg">
                  {isPlaying ? '⏸️' : '▶️'}
                </span>
              </motion.button>
              
              <motion.button
                onClick={handleStopMusic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-lg">✕</span>
              </motion.button>
            </div>
          </div>
          
          {/* Player de vídeo */}
          <div className="relative rounded-lg overflow-hidden bg-black/20">
            <ReactPlayer
              url="https://res.cloudinary.com/dj3mjaaft/video/upload/v1751272049/Clave_Especial_X_Edgardo_Nu%C3%B1ez_-_Tu_Tu_Tu_Official_Video_Rt1cnqw2tai_tvcr1i.mp4"
              playing={isPlaying}
              controls={true}
              width="100%"
              height="200px"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
          
          {/* Indicador de status */}
          <div className="mt-3 flex items-center justify-center">
            <motion.div 
              className="flex items-center gap-2 text-sm text-white/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>💖</span>
              <span>{isPlaying ? 'Tocando com amor...' : 'Pausado'}</span>
              <span>💖</span>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-red-400 text-2xl"
            style={{ left: `${heart.x}%` }}
            initial={{ y: '100vh', opacity: 0, scale: 0 }}
            animate={{
              y: '-100px',
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.8],
            }}
            transition={{
              duration: 8,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Floating Petals */}
      <div className="fixed inset-0 pointer-events-none z-4">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-pink-300 text-lg"
            style={{ left: `${petal.x}%` }}
            initial={{ y: '-50px', opacity: 0, rotate: 0 }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 1, 0.5, 0],
              rotate: [0, 180, 360],
              x: [0, Math.sin(petal.delay) * 50, 0]
            }}
            transition={{
              duration: 12,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {petal.type}
          </motion.div>
        ))}
      </div>

      <main className="min-h-screen relative z-10 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="glass-effect p-8 md:p-16 rounded-3xl relative overflow-hidden"
          >
            {/* Background Hearts */}
            <div className="absolute inset-0 opacity-10">
              <div className="text-8xl text-red-400 absolute top-4 left-4">💖</div>
              <div className="text-6xl text-pink-400 absolute top-12 right-8">💝</div>
              <div className="text-7xl text-red-300 absolute bottom-8 left-12">💗</div>
              <div className="text-5xl text-pink-300 absolute bottom-4 right-4">💕</div>
            </div>

            <div className="relative z-10">
              {/* Title with time-based message */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6"
              >
                <motion.p
                  className="text-lg text-pink-200 mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {getTimeBasedMessage()}
                </motion.p>
                <h1 className="text-4xl md:text-6xl font-bold">
                  💖 Página Especial 💖
                </h1>
              </motion.div>

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 rounded-full overflow-hidden glass-effect p-3"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/special-photo.jpg"
                    alt="Foto especial"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Heart overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-pink-500/20 rounded-full"></div>
              </motion.div>

              {/* Message with typing effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="space-y-6 mb-8"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-xl md:text-2xl text-red-200 font-light leading-relaxed"
                >
                  <motion.span
                    animate={{ textShadow: ['0 0 5px rgba(255,182,193,0.5)', '0 0 20px rgba(255,182,193,0.8)', '0 0 5px rgba(255,182,193,0.5)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    "Em cada linha de código que escrevo,
                  </motion.span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="text-xl md:text-2xl text-pink-200 font-light leading-relaxed"
                >
                  em cada funcionalidade que crio,
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="text-xl md:text-2xl text-red-300 font-light leading-relaxed"
                >
                  há um pouco do amor que sinto
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.1 }}
                  className="text-2xl md:text-3xl text-white font-semibold"
                >
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1],
                      textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 30px rgba(255,192,203,0.8)', '0 0 10px rgba(255,255,255,0.5)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    por você. 💕"
                  </motion.span>
                </motion.p>
              </motion.div>

              {/* Romantic Quote Generator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="glass-effect p-6 rounded-2xl mb-6 bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-300/30"
              >
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg text-pink-100 font-medium mb-4 min-h-[60px] flex items-center justify-center"
                >
                  {romanticQuotes[currentQuote]}
                </motion.p>
                
                <motion.button
                  onClick={generateRandomQuote}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-pink-500/20 transition-all duration-300 border border-pink-300/50"
                >
                  💕 Nova Frase Romântica
                </motion.button>
              </motion.div>

              {/* Surprise Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mb-6"
              >
                <motion.button
                  onClick={toggleSurprise}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect px-8 py-4 rounded-full font-bold text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-red-500/20 transition-all duration-300 border-2 border-pink-400/50 mb-4"
                >
                  ✨ Clique para uma Surpresa ✨
                </motion.button>
                
                {showSurprise && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="glass-effect p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-300/50"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">🎉 SURPRESA! 🎉</h3>
                      <p className="text-lg text-pink-100 mb-3">
                        Você descobriu o segredo mais fofo desta página! 
                      </p>
                      <p className="text-base text-white/80">
                        Cada vez que você sorri, meu código fica mais bonito 😊💻
                      </p>
                      <div className="mt-4 text-4xl">
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🥰
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="glass-effect p-6 md:p-8 rounded-2xl mb-8 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-300/30"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-200">
                  ✨ Uma Declaração Digital ✨
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  Este projeto não é apenas sobre música latina, tecnologia moderna ou design elegante.
                  É sobre compartilhar as coisas que amamos com as pessoas que mais importam.
                  Obrigado por fazer parte desta jornada. 🌶️❤️
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
              >
                {/* Botão para tocar TU TU TU */}
                <motion.button
                  onClick={handlePlayMusic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:bg-red-500/20 transition-all duration-300 border-2 border-red-300/50 hover:border-red-300 inline-flex items-center gap-3"
                  disabled={showPlayer}
                >
                  <span className="text-2xl">🎵</span>
                  <span>{showPlayer ? 'Tocando: TU TU TU - Clave Especial' : 'Escute "TU TU TU" da Clave Especial'}</span>
                  <span className="text-xl">💖</span>
                </motion.button>
              </motion.div>

              {/* Navigation Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/"
                  className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-red-500/20 transition-all duration-300 border border-red-300/30"
                >
                  🎵 Voltar à Música
                </Link>
                
                <Link
                  href="/sobre"
                  className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-pink-500/20 transition-all duration-300 border border-pink-300/30"
                >
                  💝 Conhecer o Criador
                </Link>
              </motion.div>

              {/* Secret Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-12 text-sm text-white/40 italic"
              >
                "Encontrou o Easter Egg! 🥚✨ Você é especial! 💖"
              </motion.div>
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-white/60">
              Feito com muito ❤️ e carinho especial
            </p>
            <p className="text-xs text-white/40 mt-2">
              YouChilli © 2025 - Uma declaração digital de amor
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
