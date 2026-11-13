import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useI18n } from '../i18n'
import { site, emailjsConfig } from '../data/site'
import Reveal from './Reveal'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

const channels = [
  { label: 'LinkedIn', icon: 'bi-linkedin', url: site.linkedin },
  { label: 'GitHub', icon: 'bi-github', url: site.github },
  { label: 'Instagram', icon: 'bi-instagram', url: site.instagram },
]

export default function Contact() {
  const { t } = useI18n()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form || status === 'sending') return

    setStatus('sending')
    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form, emailjsConfig.publicKey)
      form.reset()
      setStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="section-index">03</span>
            <h2>{t.contact.title}</h2>
          </header>
        </Reveal>

        <div className={styles.layout}>
          <Reveal>
            <p className={styles.lead}>{t.contact.lead}</p>
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

          <Reveal delay={80}>
            <form ref={formRef} onSubmit={handleSubmit} className={`card ${styles.form}`}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>{t.contact.name}</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label className={styles.field}>
                  <span>{t.contact.email}</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
              </div>
              <label className={styles.field}>
                <span>{t.contact.message}</span>
                <textarea name="message" rows={5} required />
              </label>

              <div className={styles.footer}>
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                  <i className="bi bi-send" aria-hidden="true" />
                </button>
                <p className={`${styles.status} ${status === 'error' ? styles.error : ''}`} role="status">
                  {status === 'success' && t.contact.success}
                  {status === 'error' && t.contact.error}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
