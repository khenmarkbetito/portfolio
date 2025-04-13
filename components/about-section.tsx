"use client"

import { motion } from "framer-motion"
import { Gamepad2, Code, Smile } from "lucide-react"


interface AboutSectionProps {
  id: string
}

export default function AboutSection({ id }: AboutSectionProps) {
  const skills = [
    {
      icon: <Gamepad2 className="h-8 w-8 text-[#ffc107]" />,
      title: "Gaming",
      description: "An avid gamer who enjoys diving into virtual worlds, learning strategies, and discovering what makes great games fun and engaging.",
    },
    {
      icon: <Code className="h-8 w-8 text-[#ffc107]" />,
      title: "Coding",
      description: "Skilled in Python, JavaScript, Java, and C++, with a passion for bringing ideas to life through code and solving real-world problems.",
    },
    {
      icon: <Smile className="h-8 w-8 text-[#ffc107]" />,
      title: "Friendly Student",
      description: "Always eager to learn, collaborate, and grow alongside others in the tech community.",
    },
  ]
  
  return (
    <section id={id} className="min-h-screen py-20 flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
          <div className="w-20 h-1 bg-[#ffc107] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          I'm Bernard Co Macas, a friendly student from ACLC Daet who loves gaming, coding, and exploring new ideas. I'm passionate about creating digital experiences that blend creativity, logic, and fun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a1e38]/50 backdrop-blur-sm p-8 rounded-lg border border-[#ffc107]/20"
            >
              <div className="flex justify-center mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">{skill.title}</h3>
              <p className="text-gray-300 text-center">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">My Journey</h3>
          <p className="text-gray-300 mb-4">
  My passion for technology started with a curiosity for how games worked behind the scenes. As I explored deeper, I discovered the world of coding and I was hooked.
</p>

<p className="text-gray-300 mt-6">
  I began learning languages like Python, JavaScript, Java, and C++, experimenting with small projects and building up my skills. Each line of code was a step forward in turning imagination into reality.
</p>

<p className="text-gray-300 mt-6">
  Now, as a student at ACLC Daet, I continue to grow both technically and personally taking on challenges, connecting with like minded people, and constantly learning. Whether it's through coding, gaming, or just exploring new tech, I’m always moving forward, excited for what’s next.
</p>

        </motion.div>
      </div>
    </section>
  )
}
