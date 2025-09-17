'use client'

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks'
import { mobileMenu, fadeInUp } from '@/lib/motion-variants'

// Navigation items
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Comment ça marche', href: '/how-it-works' },
  { name: 'Tarifs', href: '/pricing' },
  { name: 'Devenir rechargeur', href: '/become-charger' },
  { name: 'Contact', href: '/contact' }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { user, signOut, loading } = useAuth()

  // Détection du scroll pour effet glassmorphism
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Fermer le menu mobile au redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
        setIsUserMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' 
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <Link 
                href="/" 
                className="flex items-center space-x-3 group"
              >
                <motion.div
                  className="relative h-8 w-8 md:h-10 md:w-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  {/* Logo Zypp - Remplacez par votre logo SVG */}
                  <div className="h-full w-full bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm md:text-base">Z</span>
                  </div>
                </motion.div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Zypp
                </span>
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions Desktop */}
            <motion.div
              className="hidden md:flex items-center space-x-3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
              ) : user ? (
                <>
                  {/* Menu utilisateur connecté */}
                  <div className="relative" data-user-menu>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="relative"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.profile?.full_name || user.email?.split('@')[0] || 'Mon compte'}
                    </Button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                        >
                          <div className="py-2">
                            <Link
                              href="/account"
                              className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="h-4 w-4 mr-3" />
                              Mon profil
                            </Link>
                            <button
                              onClick={() => {
                                signOut()
                                setIsUserMenuOpen(false)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4 mr-3" />
                              Se déconnecter
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  {/* Bouton pour utilisateur non connecté */}
                  <Button variant="ghost" size="sm" href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </>
              )}
              
              <Button size="sm">
                Télécharger l'app
              </Button>
            </motion.div>

            {/* Menu Mobile Button */}
            <motion.button
              className="md:hidden relative z-10 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            variants={mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="relative flex flex-col h-full pt-20 px-4"
              variants={mobileMenu}
            >
              <nav className="flex-1 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary transition-colors rounded-xl hover:bg-accent/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Actions Mobile */}
              <motion.div
                className="space-y-3 pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {loading ? (
                  <div className="w-full h-12 rounded-xl bg-muted animate-pulse" />
                ) : user ? (
                  <>
                    <Button variant="outline" className="w-full" size="lg" href="/account">
                      <User className="h-4 w-4 mr-2" />
                      Mon profil
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" 
                      size="lg"
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" size="lg" href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Connexion
                    </Button>
                  </>
                )}
                
                <Button className="w-full" size="lg">
                  Télécharger l'app
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}