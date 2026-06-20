import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Divider from './components/Divider'
import Testimonials from './components/Testimonials'
import InfrastructureForm from './components/InfrastructureForm'
export const dynamic = 'force-dynamic' // 👈 Forces the page to fetch data on demand when visited, rather than during build
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <InfrastructureForm />
        <Divider />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
