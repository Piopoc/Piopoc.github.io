import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'it' | 'en'

const it = {
  nav: { about: 'Chi sono', projects: 'Progetti', contact: 'Contatti', menu: 'Menu', language: 'Lingua' },
  hero: {
    eyebrow: 'Studente di Ingegneria Informatica',
    lead: 'Sviluppo software con un occhio di riguardo per il backend. Mi piace avere una sfida davanti e trovare la soluzione ottimale.',
    projects: 'Vedi i progetti',
    cv: 'Scarica il CV',
    terminal: {
      role: 'studente di ingegneria informatica',
      focus: 'backend development · problem solving',
    },
  },
  about: {
    title: 'Chi sono',
    bio: [
      'Sono uno studente di Ingegneria Informatica con una forte passione per lo sviluppo software.',
      'Durante il mio percorso accademico ho sviluppato competenze in diverse tecnologie e linguaggi di programmazione, cercando sempre di creare esperienze digitali innovative e funzionali.',
    ],
    skillsTitle: 'Competenze tecniche',
    skills: { languages: 'Linguaggi', web: 'Tecnologie web', tools: 'Strumenti' },
    interestsTitle: 'Oltre il codice',
    interests: [
      { title: 'Esploratore tecnologico', desc: 'Amo testare nuovi programmi, capirne sfaccettature e potenzialità per applicarle a problemi reali.' },
      { title: 'Problem solver', desc: 'Mi piace avere una sfida e trovare la soluzione ottimale.' },
      { title: 'Lavoro di squadra', desc: 'Più di 10 anni di calcio mi hanno insegnato il vero lavoro di gruppo e la leadership.' },
      { title: 'Amante della natura', desc: "Quando posso adoro fare passeggiate in montagna e stare all'aperto." },
      { title: 'Relax', desc: 'Mi piace guardare serie TV e film in compagnia.' },
    ],
  },
  projects: {
    title: 'Progetti',
    lead: 'Progetti personali e universitari, con il codice sorgente.',
    viewOn: 'Codice su',
    all: 'Tutti i repository su GitHub',
  },
  contact: {
    title: 'Contatti',
    lead: 'Per una proposta, una collaborazione o una semplice domanda: scrivimi qui, oppure trovami sui social.',
    name: 'Nome',
    email: 'Email',
    message: 'Messaggio',
    send: 'Invia messaggio',
    sending: 'Invio in corso…',
    success: 'Messaggio inviato, grazie! Ti rispondo appena possibile.',
    error: 'Invio non riuscito. Riprova tra poco oppure contattami su LinkedIn.',
  },
  footer: { top: 'Torna su' },
}

const en: typeof it = {
  nav: { about: 'About', projects: 'Projects', contact: 'Contact', menu: 'Menu', language: 'Language' },
  hero: {
    eyebrow: 'Computer Engineering student',
    lead: 'I build software with a soft spot for the backend. I like having a challenge in front of me and finding the optimal solution.',
    projects: 'View projects',
    cv: 'Download CV',
    terminal: {
      role: 'computer engineering student',
      focus: 'backend development · problem solving',
    },
  },
  about: {
    title: 'About',
    bio: [
      'I am a Computer Engineering student with a strong passion for software development.',
      'Throughout my studies I have built skills across several technologies and programming languages, always aiming to create digital experiences that are innovative and functional.',
    ],
    skillsTitle: 'Technical skills',
    skills: { languages: 'Languages', web: 'Web technologies', tools: 'Tools' },
    interestsTitle: 'Beyond code',
    interests: [
      { title: 'Tech explorer', desc: 'I love trying out new software, understanding its nuances and potential, and applying it to real problems.' },
      { title: 'Problem solver', desc: 'I like having a challenge and finding the optimal solution.' },
      { title: 'Team player', desc: 'More than 10 years of football taught me what real teamwork and leadership mean.' },
      { title: 'Nature lover', desc: 'Whenever I can, I enjoy hiking in the mountains and spending time outdoors.' },
      { title: 'Downtime', desc: 'I enjoy watching TV series and films in good company.' },
    ],
  },
  projects: {
    title: 'Projects',
    lead: 'Personal and university projects, source code included.',
    viewOn: 'Code on',
    all: 'All repositories on GitHub',
  },
  contact: {
    title: 'Contact',
    lead: 'For an opportunity, a collaboration or just a question: write to me here, or find me on social media.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Message sent, thank you! I will get back to you as soon as possible.',
    error: 'Something went wrong. Please try again shortly or reach me on LinkedIn.',
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
