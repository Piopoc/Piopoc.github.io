import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Path from './components/Path'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Path />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
