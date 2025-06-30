import NavigationBar from '@/components/layout/NavigationBar'
import UniverseBackground from '@/components/layout/UniverseBackground'
import SobreContent from '@/components/pages/SobreContent'
import Link from 'next/link'

export const metadata = {
  title: 'Sobre o YouChilli - A História por Trás da Plataforma',
  description: 'Conheça Lucas Pimenta, o desenvolvedor por trás do YouChilli, e descubra a paixão que criou esta plataforma moderna de streaming musical.',
}

export default function SobrePage() {
  return (
    <>
      <UniverseBackground />
      <NavigationBar />
      
      <main className="min-h-screen relative z-10 pt-16">
        <SobreContent />

        {/* Footer */}
        <footer className="w-full px-4 pb-8">
          <div className="glass-effect p-6 mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm opacity-70 mb-4">
                © 2025 YouChilli - Feito com ❤️ e muito ☕ por Lucas Pimenta
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm flex-wrap">
                <Link 
                  href="/" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  Voltar ao início
                </Link>
                
                <span className="opacity-50">•</span>
                
                <a 
                  href="mailto:lucastuv@gmail.com" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  Contato
                </a>
                
                <span className="opacity-50">•</span>
                
                <a 
                  href="https://github.com/lucastuv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
