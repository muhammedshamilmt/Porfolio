import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Timeline } from "@/components/timeline"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
