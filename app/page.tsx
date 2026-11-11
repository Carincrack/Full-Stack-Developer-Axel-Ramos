import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TechStack } from "@/components/tech-stack"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { MotionProvider } from "@/components/motion-provider"

export default function Home() {
  return (
    <MotionProvider>
      {/* Solo aparece al navegar con teclado */}
      <a
        href="#projects"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-3 focus-visible:top-3 focus-visible:z-[200] focus-visible:rounded-lg focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-background"
      >
        Saltar a los proyectos
      </a>
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <TechStack />
        <Projects />
        <About />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  )
}
