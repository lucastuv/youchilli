'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ReactPlayer from 'react-player'

export default function SobreContent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const handlePlayMusic = () => {
    setShowPlayer(true)
    setIsPlaying(true)
  }

  const handleStopMusic = () => {
    setIsPlaying(false)
    setShowPlayer(false)
  }
  return (
    <>
      {/* Player de música flutuante */}
      {showPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          className="fixed bottom-32 right-6 z-50 glass-effect p-6 rounded-xl shadow-2xl border border-white/20"
          style={{ width: '350px' }}
        >
          {/* Header do player */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-chilli-red to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: isPlaying ? [0, 360] : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                <span className="text-2xl">🌶️</span>
              </motion.div>
              <div>
                <h4 className="font-bold text-white text-lg">Hollywood</h4>
                <p className="text-sm text-white/80">Peso Pluma</p>
                <p className="text-xs text-chilli-red font-medium">♪ Homenagem ao Autor ♪</p>
              </div>
            </div>
            
            {/* Controles do player */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-chilli-red/80 hover:bg-chilli-red rounded-full flex items-center justify-center transition-colors"
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
              url="https://res.cloudinary.com/dj3mjaaft/video/upload/v1751137461/hollywood_hqfkhx.mp4"
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
              <span>🎵</span>
              <span>{isPlaying ? 'Tocando agora...' : 'Pausado'}</span>
              <span>🎵</span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre o <span className="text-chilli-red">YouChilli</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-80 font-light leading-relaxed mb-8">
              A paixão pela música latina encontra a tecnologia moderna
            </p>
            
            {/* Botão para tocar Hollywood */}
            <motion.button
              onClick={handlePlayMusic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:bg-chilli-red/20 transition-all duration-300 border-2 border-chilli-red/50 hover:border-chilli-red inline-flex items-center gap-3 mx-auto"
              disabled={showPlayer}
            >
              <span className="text-2xl">🎵</span>
              <span>{showPlayer ? 'Tocando: Hollywood - Peso Pluma' : 'Escute "Hollywood" Do Peso Pluma em Homenagem ao Autor do Projeto'}</span>
              <span className="text-xl">🌶️</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Developer Photo */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass-effect p-4">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/lucas-photo.png"
                    alt="Lucas Pimenta - Desenvolvedor do YouChilli"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Developer Story */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Lucas Pimenta
              </h2>
              <p className="text-lg opacity-80 mb-6 leading-relaxed">
                Desenvolvedor Full Stack apaixonado por criar experiências digitais únicas. 
                Com expertise em <strong>Next.js</strong>, <strong>TypeScript</strong> e <strong>design moderno</strong>, 
                Lucas combina tecnologia de ponta com criatividade para dar vida a projetos inovadores.
              </p>
              <p className="text-lg opacity-80 mb-8 leading-relaxed">
                O YouChilli nasceu da paixão pela música latina e o desejo de criar uma plataforma 
                que celebrasse os grandes artistas do reggaeton, corridos tumbados e latin pop 
                com uma interface moderna e intuitiva.
              </p>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/lucas-pimenta-26896b246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-blue-500/20 transition-all duration-300 inline-flex items-center gap-2"
                >
                  💼 LinkedIn
                </a>
                
                <a
                  href="https://github.com/lucastuv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-gray-500/20 transition-all duration-300 border border-white/20 inline-flex items-center gap-2"
                >
                  💻 GitHub
                </a>
                
                <a
                  href="mailto:lucastuv@gmail.com"
                  className="glass-effect px-6 py-3 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300 border border-white/20 inline-flex items-center gap-2"
                >
                  ✉️ Contato
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-effect p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              A História do <span className="text-chilli-red">YouChilli</span>
            </h2>
            
            <div className="space-y-6 text-lg opacity-90 leading-relaxed text-left md:text-center">
              <p>
                O <strong>YouChilli</strong> surgiu da combinação de duas paixões: 
                <span className="text-chilli-red"> música latina</span> e 
                <span className="text-chilli-red"> tecnologia moderna</span>.
              </p>
              
              <p>
                Inspirado pelos ritmos vibrantes do reggaeton, pela autenticidade dos corridos tumbados 
                e pela energia do latin pop, o projeto foi criado para celebrar os grandes artistas 
                que definem a música latina contemporânea.
              </p>
              
              <p>
                Com uma interface <strong>glassmorphism</strong> elegante, animações fluidas e 
                integração real com <strong>Cloudinary</strong>, o YouChilli representa o que há 
                de mais moderno em plataformas de streaming musical.
              </p>
              
              <p className="text-chilli-red font-semibold">
                "Mais que uma plataforma de música, o YouChilli é uma experiência digital 
                que conecta tecnologia e arte."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tecnologias Utilizadas
            </h2>
            <p className="text-lg opacity-70">
              Construído com as tecnologias mais modernas do mercado
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 15', icon: '⚡', desc: 'Framework React' },
              { name: 'TypeScript', icon: '🔷', desc: 'Tipagem estática' },
              { name: 'Tailwind CSS', icon: '🎨', desc: 'Styling moderno' },
              { name: 'Framer Motion', icon: '🎬', desc: 'Animações fluidas' },
              { name: 'Cloudinary', icon: '☁️', desc: 'Mídia na nuvem' },
              { name: 'React Player', icon: '▶️', desc: 'Player de vídeo' },
              { name: 'Lucide Icons', icon: '✨', desc: 'Ícones elegantes' },
              { name: 'Glassmorphism', icon: '🔮', desc: 'Design moderno' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="glass-effect p-8 md:p-12 rounded-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vamos Conectar? 🌶️
            </h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Interessado em colaborar, contratar ou simplesmente bater um papo sobre tecnologia e música? 
              Será um prazer conversar!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300"
              >
                🎵 Explorar YouChilli
              </Link>
              
              <a
                href="https://github.com/lucastuv/youchilli"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/20"
              >
                📂 Ver Código Fonte
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
