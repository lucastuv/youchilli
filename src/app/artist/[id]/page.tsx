import { notFound } from 'next/navigation'
import NavigationBar from '@/components/layout/NavigationBar'
import UniverseBackground from '@/components/layout/UniverseBackground'
import OptimizedMusicGrid from '@/components/layout/OptimizedMusicGrid'
import Image from 'next/image'
import { getVideosByArtist } from '@/lib/videoData'

interface Artist {
  id: string
  name: string
  genre: string
  image: string
  bio: string
  songs: Song[]
  totalPlays: number
}

interface Song {
  id: string
  title: string
  artist: string
  featuring?: string[]
  duration: string
  thumbnail: string
  views?: number
}

// Base de dados dos artistas
const artists: Record<string, Artist> = {
  'peso-pluma': {
    id: 'peso-pluma',
    name: 'Peso Pluma',
    genre: 'Corridos Tumbados',
    image: '/artists/peso-pluma.png',
    bio: 'Hassan Emilio Kabande Laij, conhecido como Peso Pluma, é um cantor mexicano pioneiro nos corridos tumbados, fusão de música regional mexicana com elementos urbanos.',
    totalPlays: 15000000,
    songs: [
      {
        id: 'ella-baila-sola',
        title: 'Ella Baila Sola',
        artist: 'Peso Pluma',
        featuring: ['Eslabon Armado'],
        duration: '3:45',
        thumbnail: '/artists/peso-pluma.png',
        views: 2500000
      },
      {
        id: 'bipolar',
        title: 'Bipolar',
        artist: 'Peso Pluma',
        duration: '3:12',
        thumbnail: '/artists/peso-pluma.png',
        views: 1800000
      },
      {
        id: 'lady-gaga',
        title: 'Lady Gaga',
        artist: 'Peso Pluma',
        featuring: ['Junior H'],
        duration: '4:02',
        thumbnail: '/artists/peso-pluma.png',
        views: 3200000
      },
      {
        id: 'carnal',
        title: 'Carnal',
        artist: 'Peso Pluma',
        featuring: ['Natanael Cano'],
        duration: '3:28',
        thumbnail: '/artists/peso-pluma.png',
        views: 2100000
      }
    ]
  },
  'bad-bunny': {
    id: 'bad-bunny',
    name: 'Bad Bunny',
    genre: 'Latin Trap',
    image: '/artists/bad-bunny.png',
    bio: 'Benito Antonio Martínez Ocasio, conhecido como Bad Bunny, é um rapper, cantor e compositor porto-riquenho, um dos maiores expoentes do reggaeton e trap latino.',
    totalPlays: 25000000,
    songs: [
      {
        id: 'un-preview',
        title: 'Un Preview',
        artist: 'Bad Bunny',
        duration: '2:45',
        thumbnail: '/artists/bad-bunny.png',
        views: 5500000
      },
      {
        id: 'titi-me-pregunto',
        title: 'Tití Me Preguntó',
        artist: 'Bad Bunny',
        duration: '4:02',
        thumbnail: '/artists/bad-bunny.png',
        views: 8200000
      }
    ]
  },
  'maluma': {
    id: 'maluma',
    name: 'Maluma',
    genre: 'Reggaeton',
    image: '/artists/maluma.png',
    bio: 'Juan Luis Londoño Arias, conhecido como Maluma, é um cantor e compositor colombiano, uma das principais figuras do reggaeton e pop latino contemporâneo.',
    totalPlays: 18000000,
    songs: [
      {
        id: 'felices-los-4',
        title: 'Felices los 4',
        artist: 'Maluma',
        duration: '3:49',
        thumbnail: '/artists/maluma.png',
        views: 6800000
      }
    ]
  }
}

export async function generateStaticParams() {
  return Object.keys(artists).map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  
  // Fix para URLs com caracteres especiais
  const possibleIds = [
    rawId,
    decodeURIComponent(rawId),
    rawId?.replace('%2B', '+'),
    rawId?.replace('+', '%2B')
  ].filter(Boolean)
  
  let artist = null
  for (const testId of possibleIds) {
    artist = artists[testId]
    if (artist) break
  }
  
  if (!artist) {
    return {
      title: 'Artista não encontrado - YouChilli',
    }
  }

  return {
    title: `${artist.name} - YouChilli`,
    description: `Descubra as melhores músicas de ${artist.name} no YouChilli. ${artist.bio}`,
  }
}

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  
  // Fix para URLs com caracteres especiais  
  const possibleIds = [
    rawId,
    decodeURIComponent(rawId),
    rawId?.replace('%2B', '+'),
    rawId?.replace('+', '%2B')
  ].filter(Boolean)
  
  let artist = null
  let resolvedId = null
  for (const testId of possibleIds) {
    artist = artists[testId]
    if (artist) {
      resolvedId = testId
      break
    }
  }

  if (!artist) {
    notFound()
  }

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`
    }
    return plays.toString()
  }

  return (
    <>
      <UniverseBackground />
      <NavigationBar />
      
      <main className="min-h-screen relative z-10 pt-16">
        {/* Hero Section do Artista */}
        <section className="relative py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* Imagem do Artista */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden glass-effect p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Informações do Artista */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <span className="inline-block bg-chilli-red/20 text-chilli-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {artist.genre}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {artist.name}
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                  {artist.bio}
                </p>

                {/* Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8">
                  <div className="glass-effect px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-chilli-red">
                      {formatPlays(artist.totalPlays)}
                    </span>
                    <span className="text-white/60 ml-2">reproduções</span>
                  </div>
                  
                  <div className="glass-effect px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-chilli-red">
                      {artist.songs.length}
                    </span>
                    <span className="text-white/60 ml-2">
                      {artist.songs.length === 1 ? 'música' : 'músicas'}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-chilli-red/20 transition-all duration-300 group">
                    <span className="flex items-center gap-2">
                      ▶️ Reproduzir Tudo
                    </span>
                  </button>
                  
                  <button className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/20">
                    <span className="flex items-center gap-2">
                      🔀 Aleatório
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Músicas */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <OptimizedMusicGrid 
              videos={getVideosByArtist(resolvedId!)}
              showAddToPlaylist={true}
              enableVirtualization={false}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full px-4 pb-8">
          <div className="glass-effect p-6 mx-auto max-w-4xl relative">
            <div className="text-center">
              <p className="text-sm opacity-70 mb-4">
                © 2025 YouChilli - Todos os direitos reservados
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm flex-wrap">
                <a 
                  href="/" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  Voltar ao início
                </a>
                
                <span className="opacity-50">•</span>
                
                <a 
                  href="mailto:lucastuv@gmail.com" 
                  className="hover:text-chilli-red transition-colors opacity-80 hover:opacity-100"
                >
                  Contato
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
