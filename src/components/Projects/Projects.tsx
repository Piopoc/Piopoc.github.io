import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import projectsData from '../../data/projects.json'
import styles from './Projects.module.css'

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.projects} id="projects" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className={styles.title}>projects</h1>
          <div className={styles.redDivider} />
        </motion.div>

        <div className={styles.grid}>
          {projectsData.map((project: any, index: number) => (
            <motion.div
              key={project.title}
              className={`${styles.card} brutal-card metal-sheen`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 + index * 0.15 }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--red-accent)',
                boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)',
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <i className="bi bi-github" />
                    <span>view code</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}