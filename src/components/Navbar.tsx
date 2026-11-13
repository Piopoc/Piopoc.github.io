import { useEffect, useState } from 'react'
import { useI18n, type Lang } from '../i18n'
import { site } from '../data/site'
import styles from './Navbar.module.css'

const langs: Lang[] = ['it', 'en']

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`}>
        <a href="#top" className={styles.logo} onClick={() => setOpen(false)}>
          filippo corradi<span>.</span>
        </a>

        <div className={`${styles.menu} ${open ? styles.open : ''}`} id="nav-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.lang} role="group" aria-label={t.nav.language}>
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                className={l === lang ? styles.langActive : ''}
                aria-pressed={l === lang}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href={site.cv} target="_blank" rel="noopener noreferrer" className={`btn btn-ghost ${styles.cv}`}>
            CV
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen(!open)}
          >
            <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}
