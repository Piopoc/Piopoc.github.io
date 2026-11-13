import { useI18n } from '../i18n'
import { site } from '../data/site'
import projects from '../data/projects.json'
import Reveal from './Reveal'
import styles from './Projects.module.css'

function host(url: string) {
  return url.includes('bitbucket.org')
    ? { name: 'Bitbucket', icon: 'bi-git' }
    : { name: 'GitHub', icon: 'bi-github' }
}

export default function Projects() {
  const { t, lang } = useI18n()

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="section-index">02</span>
            <h2>{t.projects.title}</h2>
            <p>{t.projects.lead}</p>
          </header>
        </Reveal>

        <ul className={styles.grid}>
          {projects.map((project, i) => {
            const h = host(project.url)
            return (
              <li key={project.url}>
                <Reveal delay={(i % 3) * 70} className={styles.cell}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className={`card ${styles.card}`}>
                    <div className={styles.top}>
                      <i className="bi bi-folder2" aria-hidden="true" />
                      <i className={`bi bi-arrow-up-right ${styles.arrow}`} aria-hidden="true" />
                    </div>
                    <h3>{project.title[lang]}</h3>
                    <p>{project.description[lang]}</p>
                    <div className={styles.tags}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={styles.source}>
                      <i className={`bi ${h.icon}`} aria-hidden="true" />
                      {t.projects.viewOn} {h.name}
                    </span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={`link-arrow ${styles.all}`}>
            {t.projects.all}
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
