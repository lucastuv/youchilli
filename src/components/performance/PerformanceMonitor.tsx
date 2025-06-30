'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Zap, Clock, Database, CheckCircle, AlertCircle } from 'lucide-react'

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'error'
  description: string
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simular métricas de performance em tempo real
    const updateMetrics = () => {
      const newMetrics: PerformanceMetric[] = [
        {
          name: 'Page Load Time',
          value: Math.random() * 500 + 200,
          unit: 'ms',
          status: Math.random() > 0.7 ? 'warning' : 'good',
          description: 'Tempo de carregamento da página'
        },
        {
          name: 'Video Cache Hit',
          value: Math.random() * 30 + 70,
          unit: '%',
          status: Math.random() > 0.8 ? 'warning' : 'good',
          description: 'Taxa de acerto do cache de vídeos'
        },
        {
          name: 'Memory Usage',
          value: Math.random() * 40 + 30,
          unit: 'MB',
          status: Math.random() > 0.9 ? 'error' : 'good',
          description: 'Uso de memória atual'
        },
        {
          name: 'Images Loaded',
          value: Math.floor(Math.random() * 50 + 20),
          unit: '',
          status: 'good',
          description: 'Imagens carregadas com lazy loading'
        },
        {
          name: 'API Response',
          value: Math.random() * 100 + 50,
          unit: 'ms',
          status: Math.random() > 0.8 ? 'warning' : 'good',
          description: 'Tempo de resposta da API'
        },
        {
          name: 'Preload Queue',
          value: Math.floor(Math.random() * 5 + 2),
          unit: '',
          status: 'good',
          description: 'Vídeos pré-carregados na fila'
        }
      ]
      setMetrics(newMetrics)
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4" />
      case 'warning':
        return <AlertCircle className="w-4 h-4" />
      case 'error':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-24 right-4 z-50 glass-effect p-3 rounded-full hover:bg-chilli-red/20 transition-colors"
        title="Monitor de Performance"
      >
        <Cpu className="w-5 h-5 text-white" />
      </motion.button>

      {/* Performance Panel */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 300
        }}
        className="fixed bottom-24 right-16 z-40 w-80 glass-effect rounded-xl border border-white/20 overflow-hidden"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-chilli-red" />
            <h3 className="font-semibold text-white">Performance Monitor</h3>
          </div>
          <p className="text-white/60 text-sm mt-1">Otimizações em tempo real</p>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-3 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {metric.name}
                    </span>
                  </div>
                  <span className={`text-sm font-mono ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(metric.unit === 'ms' ? 0 : 1)}{metric.unit}
                  </span>
                </div>
                <p className="text-white/60 text-xs">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Performance Features */}
          <div className="mt-6 p-3 bg-chilli-red/10 rounded-lg border border-chilli-red/20">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Otimizações Ativas
            </h4>
            <ul className="space-y-1 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Lazy Loading de Imagens
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Cache Inteligente de Vídeos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Preload de Próximas Músicas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Virtualização de Grid
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Compressão de Assets
              </li>
            </ul>
          </div>

          {/* Performance Tips */}
          <div className="mt-4 p-3 glass-effect rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Dicas de Performance
            </h4>
            <ul className="space-y-1 text-xs text-white/70">
              <li>• Use o sistema de playlist para navegação contínua</li>
              <li>• Imagens são carregadas apenas quando visíveis</li>
              <li>• Cache automático melhora tempos de resposta</li>
              <li>• Preload reduz latência entre músicas</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  )
}
