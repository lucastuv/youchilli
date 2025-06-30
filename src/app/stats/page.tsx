import { Metadata } from 'next'
import NavigationBar from '../../components/layout/NavigationBar'
import UniverseBackground from '../../components/layout/UniverseBackground'
import StatsContent from '../../components/pages/StatsContent'

export const metadata: Metadata = {
  title: 'Estatísticas - YouChilli',
  description: 'Acompanhe as estatísticas do catálogo musical da plataforma YouChilli',
}

export default function StatsPage() {
  return (
    <div className="relative min-h-screen">
      <UniverseBackground />
      <NavigationBar />
      <StatsContent />
    </div>
  )
}
