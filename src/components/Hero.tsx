import { useI18n } from '../i18n'
import { site } from '../data/site'
import styles from './Hero.module.css'

const socials = [
  { label: 'GitHub', icon: 'bi-github', url: site.github },
  { label: 'LinkedIn', icon: 'bi-linkedin', url: site.linkedin },
]

export default function Hero() {
  const { t } = useI18n()

  return (
    <section className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <img src={site.photo} alt="Filippo Corradi" width={88} height={88} className={styles.photo} />
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            {t.hero.eyebrow}
          </p>
          <h1 className={styles.title}>Filippo Corradi</h1>
          <p className={styles.lead}>{t.hero.lead}</p>

          <div className={styles.cta}>
            <a href="#projects" className="btn btn-primary">
              {t.hero.projects}
              <i className="bi bi-arrow-down" aria-hidden="true" />
            </a>
            <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <i className="bi bi-file-earmark-text" aria-hidden="true" />
              {t.hero.cv}
            </a>
          </div>

          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                  <i className={`bi ${s.icon}`} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.terminal} aria-hidden="true">
          <div className={styles.terminalBar}>
            <span />
            <span />
            <span />
            <em>filippo@portfolio: ~</em>
          </div>
          <pre className={styles.terminalBody}>
            <span className={styles.prompt}>$</span> whoami{'\n'}
            <span className={styles.out}>filippo corradi — {t.hero.terminal.role}</span>
            {'\n\n'}
            <span className={styles.prompt}>$</span> ls skills/{'\n'}
            <span className={styles.out}>java  python  c++  go  sql  docker</span>
            {'\n\n'}
            <span className={styles.prompt}>$</span> cat focus.txt{'\n'}
            <span className={styles.out}>{t.hero.terminal.focus}</span>
            {'\n\n'}
            <span className={styles.prompt}>$</span> <span className={styles.cursor} />
          </pre>
        </div>
      </div>
    </section>
  )
}
