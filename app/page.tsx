import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { LatestVideo } from "@/components/sections/LatestVideo"
import { Contact } from "@/components/sections/Contact"
import { Courses } from "@/components/sections/Courses"
import { Projects } from "@/components/sections/Projects"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 pt-16">
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="videos">
        <LatestVideo />
      </section>
      <section id="courses">
        <Courses />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}