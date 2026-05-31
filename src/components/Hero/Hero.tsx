import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import ThreeDBlob from '../ThreeDBlob/ThreeDBlob'

const roles = [
  'computer engineering student',
  'backend developer',
  'problem solver',
]

const socialLinks = [
  { label: 'github', icon: 'bi-github', url: 'https://github.com/Piopoc' },
  { label: 'cv', icon: 'bi-file-earmark-person', url: '/coming-soon.html' },
  { label: 'linkedin', icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/Piopoc' },
  { label: 'instagram', icon: 'bi-instagram', url: 'https://instagram.com/filippo.corradi_' },
]

function useTypingEffect(words: string[], typeSpeed = 80, deleteSpeed = 40, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      }, typeSpeed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx(charIdx - 1)
      }, deleteSpeed)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((wordIdx + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause])

  return displayed
}

export default function Hero() {
  const typedText = useTypingEffect(roles)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <ThreeDBlob />
      <div className={styles.gradient} />
      
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.avatarContainer}>
          <motion.div
            className={`${styles.avatar} brutal-card metal-sheen`}
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div className={styles.avatarInner}>
              <span className={styles.avatarInitials}>FC</span>
            </div>
          </motion.div>
        </div>

        <motion.h1
          className={`${styles.title} ${glitch ? styles.glitch : ''}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          filippo corradi
        </motion.h1>

        <div className={styles.subtitle}>
          <motion.h2
            className={styles.roleText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {typedText}
          </motion.h2>
          <div className={styles.redDivider} />
        </div>

        <motion.div
          className={styles.social}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {socialLinks.map((s, i) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`${styles.socialBtn} brutal-btn-pill metal-sheen`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <i className={`bi ${s.icon}`} />
              <span>{s.label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <i className="bi bi-chevron-down" />
      </motion.div>
    </section>
  )
}
