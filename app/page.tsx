import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { LatestVideo } from "@/components/sections/LatestVideo"
import { Contact } from "@/components/sections/Contact"
import { Courses } from "@/components/sections/Courses"
import { Projects } from "@/components/sections/Projects"
import { BusinessServices } from "@/components/sections/BusinessServices"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="services">
        <BusinessServices />
      </section>
      <section id="work">
        <Projects />
      </section>
      <section id="expertise">
        <Skills />
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
