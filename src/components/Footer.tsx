import { useI18n } from '../i18n'
import { site } from '../data/site'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#top" className="link-arrow">
          {t.footer.top}
          <i className="bi bi-arrow-up" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
