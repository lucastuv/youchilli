import { getAllVideos, getVideosByArtist } from '../../lib/videoData'
import Link from 'next/link'
import { ChartBarIcon, PlayIcon, UsersIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'

// Dados dos artistas
const artistsData = {
  'peso-pluma': { name: 'Peso Pluma', color: 'from-red-500 to-orange-500' },
  'bad-bunny': { name: 'Bad Bunny', color: 'from-yellow-400 to-red-500' },
  'maluma': { name: 'Maluma', color: 'from-pink-500 to-purple-500' },
  'j-balvin': { name: 'J Balvin', color: 'from-green-400 to-blue-500' },
  'plan-b': { name: 'Plan B', color: 'from-blue-500 to-indigo-600' },
  'clave-especial': { name: 'Clave Especial', color: 'from-purple-500 to-pink-500' }
}

export default function StatsContent() {
  const allVideos = getAllVideos()
  const totalVideos = allVideos.length
  const totalArtists = Object.keys(artistsData).length
  const collaborations = allVideos.filter(v => v.collaboration).length

  // Estatísticas por artista
  const artistStats = Object.entries(artistsData).map(([artistId, artistData]) => {
    const videos = getVideosByArtist(artistId)
    return {
      id: artistId,
      name: artistData.name,
      color: artistData.color,
      videos: videos.length,
      videosData: videos
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          📊 Estatísticas do YouChilli
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Acompanhe o catálogo completo da plataforma de streaming musical
        </p>
      </div>

      {/* Cards de Estatísticas Gerais */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-effect p-6 rounded-lg text-center">
          <MusicalNoteIcon className="w-12 h-12 text-chilli-red mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">{totalVideos}</h3>
          <p className="text-white/60">Músicas Disponíveis</p>
        </div>

        <div className="glass-effect p-6 rounded-lg text-center">
          <UsersIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">{totalArtists}</h3>
          <p className="text-white/60">Artistas</p>
        </div>

        <div className="glass-effect p-6 rounded-lg text-center">
          <ChartBarIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
          <p className="text-white/60">Cobertura do Catálogo</p>
        </div>

        <div className="glass-effect p-6 rounded-lg text-center">
          <PlayIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-2">{collaborations}</h3>
          <p className="text-white/60">Colaborações</p>
        </div>
      </div>

      {/* Estatísticas por Artista */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🎤 Catálogo por Artista
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistStats.map((artist) => (
            <div key={artist.id} className="glass-effect p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${artist.color}`}></div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/60 mb-2">
                  <span>Músicas</span>
                  <span>{artist.videos}/9</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${artist.color}`}
                    style={{ width: `${(artist.videos / 9) * 100}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-white/60 mt-1">
                  {Math.round((artist.videos / 9) * 100)}%
                </div>
              </div>

              <Link 
                href={`/artist/${artist.id}`}
                className="block w-full bg-chilli-red hover:bg-chilli-red/80 text-white text-center py-2 rounded-lg transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Formatos Suportados */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="glass-effect p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🎬 Formatos Suportados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">MP4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Vídeo MP4</h3>
              <p className="text-white/60">Formato principal com alta compatibilidade</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">WEBM</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Vídeo WebM</h3>
              <p className="text-white/60">Formato otimizado para web</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tecnologias */}
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            ⚡ Tecnologias Utilizadas
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Cloudinary',
              'React 18', 'Node.js', 'Heroicons', 'GitHub'
            ].map((tech) => (
              <span 
                key={tech}
                className="bg-chilli-red/20 text-chilli-red px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/60">
              Plataforma desenvolvida com as mais modernas tecnologias web
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
