'use client'

import { useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'

interface NavigationBarProps {
  className?: string
}

export default function NavigationBar({ className = '' }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const menuItems = [
    { label: 'INÍCIO', href: '/', action: () => window.location.href = '/' },
    { label: 'MÚSICAS', href: '/musicas', action: () => window.location.href = '/musicas' },
    { label: 'SOBRE', href: '/sobre', action: () => window.location.href = '/sobre' },
    { label: 'STATS', href: '/stats', action: () => window.location.href = '/stats' },
    { label: 'REPO', href: 'https://github.com/lucastuv/youchilli', action: () => window.open('https://github.com/lucastuv/youchilli', '_blank') }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="glass-effect border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo esquerda */}
              <div className="flex-shrink-0">
                <Logo 
                  size="sm" 
                  animated={false} 
                  clickable={true}
                  className="cursor-pointer"
                />
              </div>

              {/* Busca central (desktop) */}
              <div className="hidden md:block flex-1 max-w-md mx-8">
                <SearchBar />
              </div>

              {/* Botões direita */}
              <div className="flex items-center gap-2">
                {/* Botão busca (mobile) */}
                <button
                  onClick={toggleSearch}
                  className="md:hidden p-2 rounded-full glass-effect hover:bg-white/10 transition-colors"
                  aria-label="Buscar"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Menu hambúrguer */}
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full glass-effect hover:bg-white/10 transition-colors"
                  aria-label="Menu"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Busca mobile (dropdown) */}
        {isSearchOpen && (
          <div className="md:hidden glass-effect border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        )}
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu content */}
          <div className="absolute top-16 right-4 left-4 sm:left-auto sm:w-80">
            <div className="glass-effect rounded-lg overflow-hidden">
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-6 py-4 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium group-hover:text-chilli-red transition-colors">
                      {item.label}
                    </span>
                    <svg 
                      className="w-4 h-4 text-white/60 group-hover:text-chilli-red transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacer para compensar navbar fixa */}
      <div className="h-16" />
    </>
  )
}
