import Logo from '@/components/layout/Logo'
import UniverseBackground from '@/components/layout/UniverseBackground'
import ArtistCarousel from '@/components/layout/ArtistCarousel'
import NavigationBar from '@/components/layout/NavigationBar'
import HeroSection from '@/components/layout/HeroSection'
import OptimizedMusicGrid from '@/components/layout/OptimizedMusicGrid'
import { getAllVideos } from '@/lib/videoData'

export default function HomePage() {
  // Pegar apenas alguns vídeos em destaque para a página inicial
  const allVideos = getAllVideos()
  const featuredVideos = allVideos.slice(0, 12) // Primeiros 12 vídeos

  return (
    <>
      {/* Background animado */}
      <UniverseBackground />
      
      {/* Navigation Bar */}
      <NavigationBar />
      
      <div className="min-h-screen relative z-10">
        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section com Logo */}
          <section className="min-h-screen flex flex-col items-center justify-center">
            {/* Logo Principal YouChilli */}
            <div className="mb-16">
              <Logo 
                size="xl" 
                animated={true} 
                clickable={true}
                className="mb-8"
              />
            </div>

            {/* Hero Content */}
            <HeroSection />
          </section>

          {/* Carrossel de Artistas */}
          <section id="artist-carousel" className="py-20">
            <ArtistCarousel />
          </section>

          {/* Grid de Músicas em Destaque */}
          <section id="featured-music" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Músicas em <span className="text-chilli-red">Destaque</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Descubra as melhores faixas do nosso catálogo, com otimizações de performance e sistema de playlist integrado.
                </p>
              </div>
              
              <OptimizedMusicGrid 
                videos={featuredVideos}
                className="mb-8"
                showAddToPlaylist={true}
                enableVirtualization={false}
              />
              
              <div className="text-center">
                <p className="text-white/50 text-sm">
                  {allVideos.length} músicas disponíveis • Sistema de playlist ativo
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer minimalista */}
        <footer className="w-full px-4 pb-8">
          <div className="glass-effect p-6 mx-auto max-w-4xl relative">
            <div className="text-center">
              <p className="text-sm opacity-70 mb-4">
                © 2025 Todos os direitos reservados
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm flex-wrap">
                <a 
                  href="mailto:lucastuv@gmail.com" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  lucastuv@gmail.com
                </a>
                
                <span className="opacity-50">•</span>
                
                <a 
                  href="https://www.linkedin.com/in/lucas-pimenta-26896b246/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  Lucas Pimenta
                </a>
                
                <span className="opacity-50">•</span>
                
                <a 
                  href="https://github.com/lucastuv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  @lucastuv
                </a>
              </div>
            </div>
            
            {/* Botão coração discreto - será implementado para página especial */}
            <div className="absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
              <a href="/especial" className="text-red-400 hover:text-red-300 transition-colors text-lg hover:scale-110 transform transition-transform">
                ❤️
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
