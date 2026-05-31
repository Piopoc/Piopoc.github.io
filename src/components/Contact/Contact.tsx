import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

const EMAILJS_CONFIG = {
  publicKey: 'Zd9gE3kR37KAZS8Lu',
  serviceId: 'service_18pzx5m',
  templateId: 'template_z0nfr8k',
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const toastRef = useRef<HTMLDivElement>(null)

  const showToast = () => {
    toastRef.current?.classList.add(styles.show)
    setTimeout(() => toastRef.current?.classList.remove(styles.show), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string

    if (!name || !email || !message) {
      alert('Please fill in all fields.')
      return
    }

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form,
        EMAILJS_CONFIG.publicKey,
      )
      form.reset()
      showToast()
    } catch {
      alert('Failed to send message. Please try again later.')
    }
  }

  return (
    <section className={styles.contact} id="contact" ref={sectionRef}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className={styles.title}>contact</h1>
          <div className={styles.redDivider} />
        </motion.div>

        <div className={styles.content}>
          <form ref={formRef} onSubmit={handleSubmit} className={`${styles.form} brutal-card`}>
            <h2 className={styles.formTitle}>get in touch</h2>
            <div className={styles.redDivider} />
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>name</label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="your name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>message</label>
              <textarea
                id="message"
                name="message"
                className={styles.input}
                placeholder="your message"
                rows={5}
                required
              />
            </div>

            <button type="submit" className={`${styles.submit} brutal-btn metal-sheen`}>
              <i className="bi bi-send-fill" />
              send
            </button>
          </form>
        </div>
      </div>

      <div ref={toastRef} className={styles.toast}>
        <i className="bi bi-check-circle-fill" />
        message sent successfully
      </div>
    </section>
  )
}