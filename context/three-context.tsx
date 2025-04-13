"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ThreeContextType {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const ThreeContext = createContext<ThreeContextType | undefined>(undefined)

export function ThreeProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState("home")

  return <ThreeContext.Provider value={{ currentSection, setCurrentSection }}>{children}</ThreeContext.Provider>
}

export function useThreeContext() {
  const context = useContext(ThreeContext)
  if (context === undefined) {
    throw new Error("useThreeContext must be used within a ThreeProvider")
  }
  return context
}
