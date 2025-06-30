'use client'

// Base de dados expandida para busca
export const searchDatabase = {
  artists: [
    {
      id: 'peso-pluma',
      name: 'Peso Pluma',
      genre: 'Corridos Tumbados',
      image: '/artists/peso-pluma.png',
      keywords: ['peso', 'pluma', 'corridos', 'tumbados', 'hassan', 'kabande']
    },
    {
      id: 'bad-bunny',
      name: 'Bad Bunny',
      genre: 'Latin Trap',
      image: '/artists/bad-bunny.png',
      keywords: ['bad', 'bunny', 'benito', 'martinez', 'trap', 'latino', 'reggaeton']
    },
    {
      id: 'maluma',
      name: 'Maluma',
      genre: 'Reggaeton',
      image: '/artists/maluma.png',
      keywords: ['maluma', 'juan', 'luis', 'londoño', 'reggaeton', 'pop', 'latino']
    },
    {
      id: 'j-balvin',
      name: 'J Balvin',
      genre: 'Reggaeton',
      image: '/artists/j-balvin.png',
      keywords: ['j', 'balvin', 'jose', 'alvaro', 'reggaeton', 'colores']
    },
    {
      id: 'plan-b',
      name: 'Plan B',
      genre: 'Reggaeton',
      image: '/artists/plan-b.png',
      keywords: ['plan', 'b', 'chencho', 'maldy', 'reggaeton', 'puerto', 'rico']
    },
    {
      id: 'clave-especial',
      name: 'Clave Especial',
      genre: 'Regional Mexicano',
      image: '/artists/clave-especial.png',
      keywords: ['clave', 'especial', 'regional', 'mexicano', 'banda']
    }
  ],
  songs: [
    // Peso Pluma - 9 músicas
    {
      id: 'peso-pluma-bipolar',
      title: 'Bipolar',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['bipolar', 'peso', 'pluma']
    },
    {
      id: 'peso-pluma-carnal',
      title: 'Carnal',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      featuring: ['Natanael Cano'],
      genre: 'Corridos Tumbados',
      keywords: ['carnal', 'peso', 'pluma', 'natanael', 'cano']
    },
    {
      id: 'peso-pluma-ella-baila-sola',
      title: 'Ella Baila Sola',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      featuring: ['Eslabon Armado'],
      genre: 'Corridos Tumbados',
      keywords: ['ella', 'baila', 'sola', 'peso', 'pluma', 'eslabon', 'armado']
    },
    {
      id: 'peso-pluma-hollywood',
      title: 'Hollywood',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['hollywood', 'peso', 'pluma']
    },
    {
      id: 'peso-pluma-la-durango',
      title: 'La Durango',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['la', 'durango', 'peso', 'pluma']
    },
    {
      id: 'peso-pluma-lady-gaga',
      title: 'Lady Gaga',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      featuring: ['Junior H'],
      genre: 'Corridos Tumbados',
      keywords: ['lady', 'gaga', 'peso', 'pluma', 'junior', 'h']
    },
    {
      id: 'peso-pluma-nova-vida',
      title: 'Nova Vida',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['nova', 'vida', 'peso', 'pluma']
    },
    {
      id: 'peso-pluma-rari',
      title: 'Rari',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['rari', 'peso', 'pluma']
    },
    {
      id: 'peso-pluma-vino-tinto',
      title: 'Vino Tinto',
      artist: 'Peso Pluma',
      artistId: 'peso-pluma',
      genre: 'Corridos Tumbados',
      keywords: ['vino', 'tinto', 'peso', 'pluma']
    },

    // Bad Bunny - 9 músicas
    {
      id: 'bad-bunny-baile-inolvidable',
      title: 'Baile Inolvidable',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['baile', 'inolvidable', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-novayol',
      title: 'NovaYol',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['novayol', 'nova', 'yol', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-voy-a-llevarte-pa-pr',
      title: 'Voy a Llevarte pa PR',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['voy', 'llevarte', 'pa', 'pr', 'puerto', 'rico', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-fina',
      title: 'FINA',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['fina', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-pitorro-de-coco',
      title: 'Pitorro de Coco',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['pitorro', 'coco', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-la-mudanza',
      title: 'La Mudanza',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['la', 'mudanza', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-ni-bien-ni-mal',
      title: 'Ni Bien Ni mal',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['ni', 'bien', 'mal', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-que-pasaria',
      title: 'Que Pasaria...',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['que', 'pasaria', 'bad', 'bunny']
    },
    {
      id: 'bad-bunny-velda',
      title: 'VeLDÁ',
      artist: 'Bad Bunny',
      artistId: 'bad-bunny',
      genre: 'Latin Trap',
      keywords: ['velda', 'bad', 'bunny']
    },

    // Maluma - 9 músicas
    {
      id: 'maluma-goyard',
      title: 'Goyard',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['goyard', 'maluma']
    },
    {
      id: 'maluma-cositas-de-la-usa',
      title: 'Cositas de la USA',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['cositas', 'usa', 'maluma']
    },
    {
      id: 'maluma-mojando-asientos',
      title: 'Mojando Asientos',
      artist: 'Maluma',
      artistId: 'maluma',
      featuring: ['Feid'],
      genre: 'Reggaeton',
      keywords: ['mojando', 'asientos', 'maluma', 'feid']
    },
    {
      id: 'maluma-peligrosa',
      title: 'Peligrosa',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['peligrosa', 'maluma']
    },
    {
      id: 'maluma-sexo-sem-titulo',
      title: 'Sexo sem titulo',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['sexo', 'sem', 'titulo', 'maluma']
    },
    {
      id: 'maluma-1-of-1',
      title: '1 of 1',
      artist: 'Maluma',
      artistId: 'maluma',
      featuring: ['The Weeknd'],
      genre: 'Reggaeton',
      keywords: ['1', 'of', 'one', 'maluma', 'weeknd']
    },
    {
      id: 'maluma-call-me',
      title: 'Call me',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['call', 'me', 'maluma']
    },
    {
      id: 'maluma-sisas-nada-mas',
      title: 'Sisas nada mas',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['sisas', 'nada', 'mas', 'maluma']
    },
    {
      id: 'maluma-don-juan',
      title: 'Don Juan',
      artist: 'Maluma',
      artistId: 'maluma',
      genre: 'Reggaeton',
      keywords: ['don', 'juan', 'maluma']
    },

    // Clave Especial - 9 músicas
    {
      id: 'clave-especial-tu-tu-tu',
      title: 'TU TU TU',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['tu', 'clave', 'especial']
    },
    {
      id: 'clave-especial-rapido-soy',
      title: 'RAPIDO SOY',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['rapido', 'soy', 'clave', 'especial']
    },
    {
      id: 'clave-especial-kalashnikov',
      title: 'KALASHNIKOV',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['kalashnikov', 'clave', 'especial']
    },
    {
      id: 'clave-especial-como-capo',
      title: 'COMO CAPO',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['como', 'capo', 'clave', 'especial']
    },
    {
      id: 'clave-especial-la-neta',
      title: 'LA NETA',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['la', 'neta', 'clave', 'especial']
    },
    {
      id: 'clave-especial-no-son-doritos',
      title: 'NO SON DORITOS',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['no', 'son', 'doritos', 'clave', 'especial']
    },
    {
      id: 'clave-especial-no-pasa-nada',
      title: 'NO PASA NADA',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['no', 'pasa', 'nada', 'clave', 'especial']
    },
    {
      id: 'clave-especial-tu-coquete',
      title: 'TU COQUETE',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['tu', 'coquete', 'clave', 'especial']
    },
    {
      id: 'clave-especial-nimodo-que-nao',
      title: 'NIMODO QUE NÃO',
      artist: 'Clave Especial',
      artistId: 'clave-especial',
      genre: 'Regional Mexicano',
      keywords: ['nimodo', 'que', 'nao', 'não', 'clave', 'especial']
    },

    // Plan B - 9 músicas
    {
      id: 'plan-b-es-um-secreto',
      title: 'Es um Secreto',
      artist: 'Plan B',
      artistId: 'plan-b',
      featuring: ['Akon'],
      genre: 'Reggaeton',
      keywords: ['es', 'um', 'secreto', 'plan', 'b', 'akon']
    },
    {
      id: 'plan-b-candy',
      title: 'Candy',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['candy', 'plan', 'b']
    },
    {
      id: 'plan-b-si-no-le-contesto',
      title: 'Si no Le Contesto',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['si', 'no', 'le', 'contesto', 'plan', 'b']
    },
    {
      id: 'plan-b-fanatica-sensual',
      title: 'Fanatica Sensual',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['fanatica', 'sensual', 'plan', 'b']
    },
    {
      id: 'plan-b-por-que-te-demoras',
      title: 'Por Que Te Demoras',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['por', 'que', 'te', 'demoras', 'plan', 'b']
    },
    {
      id: 'plan-b-mi-vecinita',
      title: 'Mi Vecinita',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['mi', 'vecinita', 'plan', 'b']
    },
    {
      id: 'plan-b-choca',
      title: 'Choca',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['choca', 'plan', 'b']
    },
    {
      id: 'plan-b-te-dijeron',
      title: 'Te Dijeron',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['te', 'dijeron', 'plan', 'b']
    },
    {
      id: 'plan-b-guatauba',
      title: 'Guatauba',
      artist: 'Plan B',
      artistId: 'plan-b',
      genre: 'Reggaeton',
      keywords: ['guatauba', 'plan', 'b']
    },

    // J Balvin - 9 músicas (com detecção de colaborações interna)
    {
      id: 'j-balvin-no-me-conoce-remix',
      title: 'No Me Conoce (Remix)',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Jhayco', 'Bad Bunny'],
      genre: 'Reggaeton',
      keywords: ['no', 'me', 'conoce', 'remix', 'j', 'balvin', 'bad', 'bunny'],
      collaboration: ['bad-bunny'] // Colaboração interna detectada
    },
    {
      id: 'j-balvin-la-cancion',
      title: 'LA CANCION',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Bad Bunny'],
      genre: 'Reggaeton',
      keywords: ['la', 'cancion', 'canção', 'j', 'balvin', 'bad', 'bunny'],
      collaboration: ['bad-bunny'] // Colaboração interna detectada
    },
    {
      id: 'j-balvin-x-remix',
      title: 'X REMIX',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Nicky Jam', 'Maluma'],
      genre: 'Reggaeton',
      keywords: ['x', 'remix', 'j', 'balvin', 'maluma'],
      collaboration: ['maluma'] // Colaboração interna detectada
    },
    {
      id: 'j-balvin-+57',
      title: '+57',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Feid', 'DZM', 'Ovy On The Drums', 'Blessd', 'SOG', 'Ryan Castro'],
      genre: 'Reggaeton',
      keywords: ['57', 'j', 'balvin', 'feid']
    },
    {
      id: 'j-balvin-mi-gente',
      title: 'Mi Gente',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Willy William'],
      genre: 'Reggaeton',
      keywords: ['mi', 'gente', 'j', 'balvin']
    },
    {
      id: 'j-balvin-downtown',
      title: 'Downtown',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Anitta'],
      genre: 'Reggaeton',
      keywords: ['downtown', 'j', 'balvin', 'anitta']
    },
    {
      id: 'j-balvin-que-pretendes',
      title: 'QUE PRETENDES',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Bad Bunny'],
      genre: 'Reggaeton',
      keywords: ['que', 'pretendes', 'j', 'balvin', 'bad', 'bunny'],
      collaboration: ['bad-bunny'] // Colaboração interna detectada
    },
    {
      id: 'j-balvin-un-peso',
      title: 'UN PESO',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      featuring: ['Marciano\'s Crew'],
      genre: 'Reggaeton',
      keywords: ['un', 'peso', 'j', 'balvin']
    },
    {
      id: 'j-balvin-ay-vamos',
      title: 'Ay Vamos',
      artist: 'J Balvin',
      artistId: 'j-balvin',
      genre: 'Reggaeton',
      keywords: ['ay', 'vamos', 'j', 'balvin']
    }
  ],
  genres: [
    { id: 'corridos-tumbados', name: 'Corridos Tumbados' },
    { id: 'reggaeton', name: 'Reggaeton' },
    { id: 'latin-trap', name: 'Latin Trap' },
    { id: 'regional-mexicano', name: 'Regional Mexicano' },
    { id: 'latin-pop', name: 'Latin Pop' }
  ]
}

export interface SearchResult {
  id: string
  type: 'artist' | 'song' | 'genre'
  title: string
  subtitle: string
  image?: string
  url: string
  relevance: number
}

export function performSearch(query: string): SearchResult[] {
  if (!query.trim()) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  const results: SearchResult[] = []

  // Buscar artistas
  searchDatabase.artists.forEach(artist => {
    let relevance = 0
    
    // Nome exato
    if (artist.name.toLowerCase().includes(normalizedQuery)) {
      relevance += 100
    }
    
    // Keywords
    artist.keywords.forEach(keyword => {
      if (keyword.includes(normalizedQuery)) {
        relevance += 50
      }
    })
    
    // Gênero
    if (artist.genre.toLowerCase().includes(normalizedQuery)) {
      relevance += 30
    }
    
    if (relevance > 0) {
      results.push({
        id: artist.id,
        type: 'artist',
        title: artist.name,
        subtitle: artist.genre,
        image: artist.image,
        url: `/artist/${artist.id}`,
        relevance
      })
    }
  })

  // Buscar músicas
  searchDatabase.songs.forEach(song => {
    let relevance = 0
    
    // Título exato
    if (song.title.toLowerCase().includes(normalizedQuery)) {
      relevance += 100
    }
    
    // Artista
    if (song.artist.toLowerCase().includes(normalizedQuery)) {
      relevance += 80
    }
    
    // Featuring
    if (song.featuring) {
      song.featuring.forEach(feat => {
        if (feat.toLowerCase().includes(normalizedQuery)) {
          relevance += 70
        }
      })
    }
    
    // Keywords
    song.keywords.forEach(keyword => {
      if (keyword.includes(normalizedQuery)) {
        relevance += 40
      }
    })
    
    // Gênero
    if (song.genre.toLowerCase().includes(normalizedQuery)) {
      relevance += 20
    }
    
    if (relevance > 0) {
      results.push({
        id: song.id,
        type: 'song',
        title: song.title,
        subtitle: `${song.artist}${song.featuring ? ` feat. ${song.featuring.join(', ')}` : ''}`,
        image: searchDatabase.artists.find(a => a.id === song.artistId)?.image,
        url: `/song/${song.id}`,
        relevance
      })
    }
  })

  // Buscar gêneros
  searchDatabase.genres.forEach(genre => {
    if (genre.name.toLowerCase().includes(normalizedQuery)) {
      const artistsInGenre = searchDatabase.artists.filter(a => 
        a.genre.toLowerCase() === genre.name.toLowerCase()
      )
      
      if (artistsInGenre.length > 0) {
        results.push({
          id: genre.id,
          type: 'genre',
          title: genre.name,
          subtitle: `${artistsInGenre.length} artistas`,
          url: `/?genre=${genre.id}`,
          relevance: 60
        })
      }
    }
  })

  // Ordenar por relevância e retornar os melhores resultados
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 8) // Máximo 8 resultados
}

export function getPopularSearches(): SearchResult[] {
  return [
    {
      id: 'peso-pluma',
      type: 'artist',
      title: 'Peso Pluma',
      subtitle: 'Corridos Tumbados',
      image: '/artists/peso-pluma.png',
      url: '/artist/peso-pluma',
      relevance: 100
    },
    {
      id: 'peso-pluma-ella-baila-sola',
      type: 'song',
      title: 'Ella Baila Sola',
      subtitle: 'Peso Pluma feat. Eslabon Armado',
      image: '/artists/peso-pluma.png',
      url: '/song/peso-pluma-ella-baila-sola',
      relevance: 100
    },
    {
      id: 'bad-bunny',
      type: 'artist',
      title: 'Bad Bunny',
      subtitle: 'Latin Trap',
      image: '/artists/bad-bunny.png',
      url: '/artist/bad-bunny',
      relevance: 100
    },
    {
      id: 'reggaeton',
      type: 'genre',
      title: 'Reggaeton',
      subtitle: '4 artistas',
      url: '/?genre=reggaeton',
      relevance: 100
    }
  ]
}
