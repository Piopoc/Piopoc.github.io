import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className={`${styles.btn} brutal-btn metal-sheen`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        y: visible ? 0 : 50,
        scale: visible ? 1 : 0.8
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <i className="bi bi-arrow-up" />
    </motion.button>
  )
}