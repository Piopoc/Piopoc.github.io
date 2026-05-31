import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'linguaggi di programmazione',
      items: ['C++', 'C', 'Python', 'Go', 'Java'],
      delay: 0.6,
    },
    {
      title: 'tecnologie web',
      items: ['HTML/CSS', 'Bootstrap'],
      delay: 1.1,
    },
    {
      title: 'strumenti',
      items: ['Git', 'SQL'],
      delay: 1.3,
    },
  ]

  const interests = [
    { icon: 'bi-lightbulb', title: 'esploratore tecnologico', desc: 'amo testare nuovi programmi, capirne le sfaccettature e potenzialità per applicarle a problemi reali' },
    { icon: 'bi-puzzle', title: 'problem solver', desc: 'mi piace avere una sfida e trovare la soluzione ottimale' },
    { icon: 'bi-people', title: 'lavoro di squadra', desc: 'più di 10 anni di calcio mi hanno insegnato il vero lavoro di gruppo e la leadership' },
    { icon: 'bi-tree', title: 'amante della natura', desc: 'quando posso adoro fare passeggiate in montagna e stare all\'aperto' },
    { icon: 'bi-tv', title: 'relax', desc: 'mi piace guardare serie tv e film in compagnia' },
  ]

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className={styles.title}>chi sono</h1>
          <div className={styles.redDivider} />
        </motion.div>

        <div className={styles.layout}>
          <motion.div
            className={styles.bioCol}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={`${styles.bio} brutal-card`}>
              <p className={styles.bioText}>
                studente di ingegneria informatica con una forte passione per lo sviluppo software.
              </p>
              <p className={styles.bioText}>
                durante il mio percorso accademico ho sviluppato competenze in varie tecnologie e linguaggi di programmazione,
                cercando sempre di creare esperienze digitali innovative e funzionali.
              </p>
            </div>

            <div className={styles.interestsSection}>
              <h3 className={styles.interestsTitle}>interessi personali</h3>
              <div className={styles.interestsGrid}>
                {interests.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className={styles.interestCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 + i * 0.08 }}
                    whileHover={{ borderColor: 'var(--red-accent)', y: -3 }}
                  >
                    <i className={`bi ${item.icon}`} />
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.skillsCol}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className={styles.skillsTitle}>competenze tecniche</h2>
            <div className={styles.skillsDivider} />
            <div className={styles.skillsCategories}>
              {skillCategories.map((cat) => (
                <div key={cat.title} className={styles.category}>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <div className={styles.skillsGrid}>
                    {cat.items.map((skill, index) => (
                      <motion.span
                        key={skill}
                        className={`${styles.skill} brutal-card metal-sheen`}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20, scale: inView ? 1 : 0.9 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: cat.delay + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5, borderColor: 'var(--red-accent)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}