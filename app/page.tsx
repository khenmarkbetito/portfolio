"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import ThreeScene from "@/components/three-scene"
import Navigation from "@/components/navigation"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import { useThreeContext } from "@/context/three-context"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const { setCurrentSection } = useThreeContext()
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentSection(activeSection)
  }, [activeSection, setCurrentSection])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const handleScroll = () => {
    if (!sectionsRef.current) return

    const sections = sectionsRef.current.children
    const scrollPosition = window.scrollY + window.innerHeight / 2

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveSection(section.id)
        break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen"
          >
            <ThreeScene />
            <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

            <div ref={sectionsRef} className="relative z-10">
              <section id="home" className="h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Bernard Co Macas</h1>
                  <p className="text-xl text-gray-300 max-w-md mx-auto">
                  a student at ACLC Daet who enjoys gaming, coding, and exploring new things.
                  </p>
                </div>
              </section>

              <AboutSection id="about" />
              <ProjectsSection id="projects" />
              <ContactSection id="contact" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
