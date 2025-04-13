"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.05
        return newProgress >= 99 ? 100 : newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1e38]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Circle background */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#0a1e38"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="0"
              className="drop-shadow-lg"
            />

            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffc107"
              strokeWidth="8"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
              transition={{ duration: 0.5 }}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Name in the center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ffc107] font-bold">
            <div className="text-sm">Bernard</div>
            <div className="text-sm">Co</div>
            <div className="text-sm">Macas</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white text-sm"
        >
          Loading experience...
        </motion.div>
      </div>
    </motion.div>
  )
}
