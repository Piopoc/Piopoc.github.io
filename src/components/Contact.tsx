import { useI18n } from '../i18n'
import { site } from '../data/site'
import Reveal from './Reveal'
import styles from './Contact.module.css'

const channels = [
  { label: 'LinkedIn', icon: 'bi-linkedin', url: site.linkedin },
  { label: 'GitHub', icon: 'bi-github', url: site.github },
  { label: 'Instagram', icon: 'bi-instagram', url: site.instagram },
]

export default function Contact() {
  const { t } = useI18n()

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="section-index">04</span>
            <h2>{t.contact.title}</h2>
          </header>
        </Reveal>

        <div className={styles.layout}>
          <Reveal>
            <p className={styles.lead}>{t.contact.lead}</p>
            <a href={`mailto:${site.email}`} className={styles.email}>
              {site.email}
            </a>
            <div>
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                <i className="bi bi-envelope" aria-hidden="true" />
                {t.contact.write}
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className={styles.channels}>
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    <i className={`bi ${c.icon}`} aria-hidden="true" />
                    <span>{c.label}</span>
                    <i className={`bi bi-arrow-up-right ${styles.arrow}`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
