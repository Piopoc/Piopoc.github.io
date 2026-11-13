import { useI18n } from '../i18n'
import Reveal from './Reveal'
import styles from './About.module.css'

const interestIcons = ['bi-lightbulb', 'bi-puzzle', 'bi-people', 'bi-tree', 'bi-film', 'bi-hdd-rack']

export default function About() {
  const { t } = useI18n()

  const skills = [
    { title: t.about.skills.programming, items: ['Java', 'Python', 'C++', 'Go', 'C', 'SQL', 'HTML/CSS'] },
    { title: t.about.skills.backend, items: ['Spring Boot', 'REST APIs', 'Tomcat', 'Servlet/JSP'] },
    { title: t.about.skills.data, items: ['PostgreSQL', 'MongoDB', 'Elasticsearch', 'BigQuery'] },
    { title: t.about.skills.tools, items: ['Docker', 'Docker Compose', 'Git', 'Maven', 'CMake', 'LaTeX'] },
    { title: t.about.skills.spoken, items: t.about.spoken },
  ]

  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="section-index">01</span>
            <h2>{t.about.title}</h2>
          </header>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.bio}>
            {t.about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <div className={`card ${styles.skills}`}>
              <h3 className="label">{t.about.skillsTitle}</h3>
              <dl>
                {skills.map((group) => (
                  <div key={group.title} className={styles.skillRow}>
                    <dt>{group.title}</dt>
                    <dd>
                      {group.items.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h3 className={`label ${styles.interestsTitle}`}>{t.about.interestsTitle}</h3>
        </Reveal>
        <ul className={styles.interests}>
          {t.about.interests.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 60} className={styles.interest}>
                <i className={`bi ${interestIcons[i]}`} aria-hidden="true" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
