"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface LaunchScreenProps {
  onLaunch: () => void
  hasLaunched: boolean
}

export default function LaunchScreen({ onLaunch, hasLaunched }: LaunchScreenProps) {
  const [isLaunching, setIsLaunching] = useState(false)

  const handleLaunchClick = () => {
    setIsLaunching(true)
    setTimeout(() => {
      onLaunch()
    }, 500) // Start the transition to portfolio slightly before animation completes
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-900 to-black overflow-hidden relative flex flex-col items-center justify-center">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <Stars />
      </div>

      {/* Earth */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40vh] z-10"
        animate={isLaunching ? { y: "100vh", transition: { duration: 2.5 } } : {}}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-full overflow-hidden">
          {/* Continents */}
          <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-green-700 rounded-full opacity-80"></div>
          <div className="absolute top-[30%] left-[50%] w-[20%] h-[20%] bg-green-700 rounded-full opacity-80"></div>
          <div className="absolute top-[15%] left-[60%] w-[15%] h-[25%] bg-green-700 rounded-full opacity-80"></div>

          {/* Clouds */}
          <div className="absolute top-[5%] left-[10%] w-[15%] h-[10%] bg-white rounded-full opacity-50"></div>
          <div className="absolute top-[15%] left-[30%] w-[20%] h-[8%] bg-white rounded-full opacity-50"></div>
          <div className="absolute top-[10%] left-[70%] w-[18%] h-[12%] bg-white rounded-full opacity-50"></div>
        </div>
      </motion.div>

      {/* Rocket */}
      <motion.div
        className="absolute bottom-[35vh] left-1/2 -translate-x-1/2 z-20"
        animate={
          isLaunching
            ? {
                y: [0, -20, -window.innerHeight * 1.5],
                scale: [1, 1, 0.5],
                transition: {
                  duration: 2.5,
                  times: [0, 0.1, 1],
                  ease: ["easeIn", "easeOut", "easeInOut"],
                },
              }
            : {
                y: [0, -10, 0],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                },
              }
        }
      >
        <div className="relative">
          {/* Rocket body */}
          <div className="w-16 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full relative">
            {/* Window */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full border-2 border-gray-400"></div>

            {/* Fins */}
            <div className="absolute bottom-0 -left-4 w-4 h-12 bg-red-500 skew-x-[30deg]"></div>
            <div className="absolute bottom-0 -right-4 w-4 h-12 bg-red-500 skew-x-[-30deg]"></div>

            {/* Nose cone */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-500"></div>

            {/* Logo */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center font-bold text-blue-600">
              <div className="text-xs">PORTFOLIO</div>
            </div>
          </div>

          {/* Rocket flames */}
          {isLaunching && (
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0.5, 1.5, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="w-10 h-20 bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent rounded-b-full animate-pulse"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-16 bg-gradient-to-t from-white via-yellow-300 to-transparent rounded-b-full animate-pulse"></div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Launch button and content */}
      <motion.div
        className="relative z-30 text-center"
        animate={isLaunching ? { opacity: 0, y: 50, transition: { duration: 1 } } : {}}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Welcome to my Portfolio
        </motion.h1>

        <motion.p
          className="text-xl text-gray-200 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Ready to explore my universe of web development?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Button
            size="lg"
            onClick={handleLaunchClick}
            disabled={isLaunching}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full"
          >
            {isLaunching ? "Launching..." : "Launch 🚀"}
          </Button>
        </motion.div>
      </motion.div>

      {/* Launch overlay - fades in when launching */}
      {isLaunching && (
        <motion.div
          className="absolute inset-0 bg-black z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      )}
    </div>
  )
}

// Stars background component
function Stars() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([])

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000)
      const newStars = []

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
        })
      }

      setStars(newStars)
    }

    generateStars()
    window.addEventListener("resize", generateStars)

    return () => {
      window.removeEventListener("resize", generateStars)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
