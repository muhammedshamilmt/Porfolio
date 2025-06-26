import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Occupation } from "@/components/occupation"
import { Services } from "@/components/services"
import { TechStack } from "@/components/tech-stacks"
import { ResumeSection } from "@/components/resume-section"
import { Showcase } from "@/components/showcase"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Timeline } from "@/components/timeline"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <About />
      <Occupation />
      {/* <Timeline /> */}
      <ResumeSection />
      <TechStack />
      <Showcase />
      <Projects />
      {/* <Blog /> */}
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
