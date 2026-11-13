import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'it' | 'en'

const it = {
  nav: { about: 'Chi sono', path: 'Percorso', projects: 'Progetti', contact: 'Contatti', menu: 'Menu', language: 'Lingua' },
  hero: {
    eyebrow: 'Studente magistrale di Ingegneria Informatica',
    lead: 'Mi specializzo in Web Information and Data Engineering, con esperienza pratica in sviluppo backend, servizi cloud e applicazioni data-intensive.',
    projects: 'Vedi i progetti',
    cv: 'Scarica il CV',
    terminal: {
      role: 'studente magistrale di ingegneria informatica',
      focus: 'backend · cloud · data engineering',
    },
  },
  about: {
    title: 'Chi sono',
    bio: [
      'Sono uno studente magistrale di Ingegneria Informatica all’Università di Padova, con specializzazione in Web Information and Data Engineering ed esperienza pratica in sviluppo backend, servizi cloud e applicazioni data-intensive.',
      'Mi interessano i sistemi distribuiti e l’infrastruttura cloud: mi piace costruire software che integra piattaforme dati e strumenti basati sull’AI.',
    ],
    skillsTitle: 'Competenze tecniche',
    skills: { programming: 'Programmazione', backend: 'Backend e web', data: 'Database e ricerca', tools: 'Cloud e strumenti', spoken: 'Lingue' },
    spoken: ['Italiano · madrelingua', 'Inglese · B2'],
    interestsTitle: 'Oltre il codice',
    interests: [
      { title: 'Esploratore tecnologico', desc: 'Amo testare nuovi programmi, capirne sfaccettature e potenzialità per applicarle a problemi reali.' },
      { title: 'Problem solver', desc: 'Mi piace avere una sfida e trovare la soluzione ottimale.' },
      { title: 'Lavoro di squadra', desc: 'Più di 10 anni di calcio mi hanno insegnato il vero lavoro di gruppo e la leadership.' },
      { title: 'Amante della natura', desc: "Quando posso adoro fare passeggiate in montagna e stare all'aperto." },
      { title: 'Relax', desc: 'Mi piace guardare serie TV e film in compagnia.' },
      { title: 'Linux e HomeLab', desc: 'Linux è il mio ambiente di lavoro e nel tempo libero mi dedico al mio homelab.' },
    ],
  },
  path: {
    title: 'Percorso',
    experience: 'Esperienza',
    education: 'Formazione',
    present: 'in corso',
    job: {
      role: 'Software Engineering Intern',
      period: 'Set 2024 – Ott 2024',
      place: 'Padova',
      points: [
        'Sviluppo di un backend in Go per interrogare e servire dati IoT storici salvati su Google BigQuery.',
        'Implementazione di API REST per recuperare i dati dei dispositivi in base a ID e intervallo temporale.',
        'Realizzazione di un’interfaccia web leggera per visualizzare serie temporali IoT.',
      ],
    },
    degrees: [
      { title: 'Laurea Magistrale in Ingegneria Informatica', school: 'Università di Padova', period: 'Set 2025 – in corso' },
      { title: 'Laurea Triennale in Ingegneria Informatica', school: 'Università di Padova', period: 'Set 2022 – Set 2025' },
    ],
  },
  projects: {
    title: 'Progetti',
    lead: 'Una selezione di sei progetti: tutto il resto è su GitHub.',
    viewOn: 'Codice su',
    paper: 'Paper',
    all: 'Tutti i repository su GitHub',
  },
  contact: {
    title: 'Contatti',
    lead: 'Per una proposta, una collaborazione o una semplice domanda: scrivimi via email o con il modulo qui accanto.',
    name: 'Nome',
    email: 'Email',
    message: 'Messaggio',
    send: 'Invia messaggio',
    sending: 'Invio in corso…',
    success: 'Messaggio inviato, grazie! Ti rispondo appena possibile.',
    error: 'Invio non riuscito. Riprova tra poco oppure scrivimi direttamente via email.',
  },
  footer: { top: 'Torna su' },
}

const en: typeof it = {
  nav: { about: 'About', path: 'Experience', projects: 'Projects', contact: 'Contact', menu: 'Menu', language: 'Language' },
  hero: {
    eyebrow: 'Computer Engineering MSc student',
    lead: 'Specializing in Web Information and Data Engineering, with hands-on experience in backend development, cloud services and data-intensive applications.',
    projects: 'View projects',
    cv: 'Download CV',
    terminal: {
      role: 'computer engineering msc student',
      focus: 'backend · cloud · data engineering',
    },
  },
  about: {
    title: 'About',
    bio: [
      'I am a Computer Engineering MSc student at the University of Padua, specializing in Web Information and Data Engineering, with hands-on experience in backend development, cloud services and data-intensive applications.',
      'I am interested in distributed systems and cloud infrastructure, and I enjoy building software that integrates data platforms and AI-based tools.',
    ],
    skillsTitle: 'Technical skills',
    skills: { programming: 'Programming', backend: 'Backend & web', data: 'Databases & search', tools: 'Cloud & tools', spoken: 'Languages' },
    spoken: ['Italian · native', 'English · B2'],
    interestsTitle: 'Beyond code',
    interests: [
      { title: 'Tech explorer', desc: 'I love trying out new software, understanding its nuances and potential, and applying it to real problems.' },
      { title: 'Problem solver', desc: 'I like having a challenge and finding the optimal solution.' },
      { title: 'Team player', desc: 'More than 10 years of football taught me what real teamwork and leadership mean.' },
      { title: 'Nature lover', desc: 'Whenever I can, I enjoy hiking in the mountains and spending time outdoors.' },
      { title: 'Downtime', desc: 'I enjoy watching TV series and films in good company.' },
      { title: 'Linux & HomeLab', desc: 'Linux is my daily environment, and in my spare time I tinker with my homelab.' },
    ],
  },
  path: {
    title: 'Experience',
    experience: 'Experience',
    education: 'Education',
    present: 'ongoing',
    job: {
      role: 'Software Engineering Intern',
      period: 'Sep 2024 – Oct 2024',
      place: 'Padua, Italy',
      points: [
        'Developed a Go backend for querying and serving historical IoT data stored in Google BigQuery.',
        'Implemented REST APIs for retrieving device data based on device ID and time range.',
        'Built a lightweight web interface for visualizing time-series IoT data.',
      ],
    },
    degrees: [
      { title: 'MSc in Computer Engineering', school: 'University of Padua', period: 'Sep 2025 – ongoing' },
      { title: 'BSc in Computer Engineering', school: 'University of Padua', period: 'Sep 2022 – Sep 2025' },
    ],
  },
  projects: {
    title: 'Projects',
    lead: 'A selection of six projects: everything else is on GitHub.',
    viewOn: 'Code on',
    paper: 'Paper',
    all: 'All repositories on GitHub',
  },
  contact: {
    title: 'Contact',
    lead: 'For an opportunity, a collaboration or just a question: drop me an email or use the form.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Message sent, thank you! I will get back to you as soon as possible.',
    error: 'Something went wrong. Please try again shortly or email me directly.',
  },
  footer: { top: 'Back to top' },
}

const dictionaries = { it, en }
const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    // storage unavailable: fall back to the browser language
  }
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'
}

const I18nContext = createContext<{ lang: Lang; t: typeof it; setLang: (l: Lang) => void } | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
