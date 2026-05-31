import styles from './Footer.module.css'

const socials = [
  { icon: 'bi-github', url: 'https://github.com/Piopoc' },
  { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/Piopoc' },
  { icon: 'bi-instagram', url: 'https://instagram.com/filippo.corradi_' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.social} brutal-card metal-sheen`}>
          {socials.map(s => (
            <a
              key={s.icon}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <i className={`bi ${s.icon}`} />
            </a>
          ))}
        </div>
        
        <div className={styles.copyright}>
          <div className={styles.borderBottom} />
          <p className={styles.copy}>
            © {new Date().getFullYear()} filippo corradi. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}