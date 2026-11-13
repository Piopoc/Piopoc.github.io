import { useI18n } from '../i18n'
import Reveal from './Reveal'
import styles from './Path.module.css'

const internshipRepo = 'https://github.com/Piopoc/IoT-simulator'

export default function Path() {
  const { t } = useI18n()
  const { job, degrees } = t.path

  return (
    <section className="section" id="path">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="section-index">02</span>
            <h2>{t.path.title}</h2>
          </header>
        </Reveal>

        <div className={styles.layout}>
          <Reveal>
            <h3 className="label">{t.path.experience}</h3>
            <article className={styles.entry}>
              <p className={styles.period}>{job.period}</p>
              <h4>{job.role}</h4>
              <p className={styles.org}>
                M31 <span>· {job.place}</span>
              </p>
              <ul className={styles.points}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a href={internshipRepo} target="_blank" rel="noopener noreferrer" className="link-arrow">
                <i className="bi bi-github" aria-hidden="true" />
                Piopoc/IoT-simulator
              </a>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="label">{t.path.education}</h3>
            {degrees.map((degree) => (
              <article key={degree.title} className={styles.entry}>
                <p className={styles.period}>{degree.period}</p>
                <h4>{degree.title}</h4>
                <p className={styles.org}>{degree.school}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
