import React from 'react'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import { PlaylistProvider } from '@/contexts/PlaylistContextForced'
import { PlayerStateProvider } from '@/contexts/PlayerStateContext'
import SmartPlaylistControls from '@/components/player/SmartPlaylistControls'

const inter = Inter({ subsets: ['latin'] })
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script'
})

export const metadata = {
  title: 'YouChilli 🌶️ - Plataforma de Música Latina',
  description: 'Plataforma moderna de streaming com os maiores hits da música latina. Peso Pluma, Bad Bunny, J Balvin, Maluma e mais!',
  keywords: 'música latina, reggaeton, corridos tumbados, Bad Bunny, J Balvin, Peso Pluma, Maluma',
  authors: [{ name: 'Lucas Pimenta', url: 'https://github.com/lucastuv' }],
  creator: 'Lucas Pimenta',
  publisher: 'YouChilli',
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF0000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${dancingScript.variable} bg-black text-white overflow-x-hidden`}>
        <PlayerStateProvider>
          <PlaylistProvider>
            <div className="min-h-screen relative pb-20">            
              {/* Conteúdo principal */}
              <div className="relative z-10">
                {children}
              </div>
              
              {/* Controles de playlist fixos na parte inferior */}
              <div className="fixed bottom-0 left-0 right-0 z-40">
                <SmartPlaylistControls />
              </div>
            </div>
          </PlaylistProvider>
        </PlayerStateProvider>
      </body>
    </html>
  )
}
