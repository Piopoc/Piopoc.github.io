import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const links = [
  { label: 'home', href: '#hero' },
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <div className={styles.logoContainer}>
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleClick('#hero') }}
            className={styles.logo}
          >
            filippo corradi
          </a>
          <span className={styles.logoDot} />
        </div>

        <div className={styles.desktopLinks}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); handleClick(l.href) }}
              className={`${styles.link} ${hovered === l.label ? styles.hovered : ''}`}
              onMouseEnter={() => setHovered(l.label)}
              onMouseLeave={() => setHovered(null)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={`${styles.mobileMenu} brutal-card`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleClick(l.href) }}
                  className={styles.mobileLink}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}