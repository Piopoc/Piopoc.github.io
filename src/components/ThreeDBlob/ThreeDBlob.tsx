import { useRef, useMemo } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import styles from './ThreeDBlob.module.css'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  drift: number
}

export default function ThreeDBlob() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = []
    for (let i = 0; i < 30; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        drift: -20 + Math.random() * 40,
      })
    }
    return items
  }, [])

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        className={styles.blob}
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, 60]),
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          scale,
        }}
        animate={{
          borderRadius: [
            '60% 40% 70% 30% / 50% 60% 40% 50%',
            '40% 60% 30% 70% / 60% 30% 70% 40%',
            '55% 45% 65% 35% / 45% 55% 45% 55%',
            '60% 40% 70% 30% / 50% 60% 40% 50%',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.blob2}
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, -50]),
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
        }}
        animate={{
          borderRadius: [
            '40% 60% 30% 70% / 60% 30% 70% 40%',
            '60% 40% 70% 30% / 50% 60% 40% 50%',
            '45% 55% 35% 65% / 55% 45% 55% 45%',
            '40% 60% 30% 70% / 60% 30% 70% 40%',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, p.drift, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
