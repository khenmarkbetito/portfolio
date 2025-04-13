"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectsProps {
  id: string
}

export default function ProjectsSection({ id }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const projects = [
    {
      title: "Python Quiz RPG",
      description: "A text-based Python game where you play as a brave Knight battling a Bandit in a quiz duel. Answer programming questions correctly to strike your enemy each wrong answer brings you closer to defeat. First to 0 health loses!",
      image: "/quiz-game.png?height=600&width=800",
      tags: ["Python", "Quiz Game", "RPG", "Text-Based", "Programming", "CLI Game", "Beginner Friendly"],
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      title: "Kreatify Inventory System",
      description: "A simple and efficient inventory management system designed to help businesses track, organize, and manage their products with ease. Built for reliability, usability, and scalability.",
      image: "/kreatify.png?height=600&width=800",
      tags: ["PHP", "JavaScript", "CSS", "MySQL", "Inventory Management", "Web App", "Admin Dashboard"],
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      title: "Portfolio",
      description: "A modern, responsive developer portfolio built with React, TypeScript, and Node.js. Showcasing projects, and experience in a clean and interactive design.",
      image: "/portfolio.png?height=600&width=800",
      tags: ["React", "TypeScript", "Node.js", "Responsive Design", "Web Development", "Portfolio"],      
      links: {
        live: "#",
        github: "#",
      },
    },
  ]

  return (
    <section id={id} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Projects</h2>
          <div className="w-20 h-1 bg-[#ffc107] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of my creative coding projects and experiments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a1e38]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-[#ffc107]/20"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: activeProject === index ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <AnimatePresence>
                  {activeProject === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-[#0a1e38]/80 flex items-center justify-center gap-4"
                    >
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#ffc107] rounded-full text-[#0a1e38] hover:bg-white transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#ffc107] rounded-full text-[#0a1e38] hover:bg-white transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-[#ffc107]/10 text-[#ffc107] text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
