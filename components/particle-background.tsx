"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Particle settings
    const particleCount = isMobile ? 50 : 100
    const particles: Particle[] = []
    const connectionDistance = isMobile ? 100 : 150
    const primaryColor =
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "hsl(262.1 83.3% 57.8%)"

    // Convert HSL to RGB for particles
    const hslToRgb = (h: string, s: string, l: string) => {
      // Default to a purple if parsing fails
      let hue = 262.1
      let saturation = 83.3
      let lightness = 57.8

      try {
        hue = Number.parseFloat(h)
        saturation = Number.parseFloat(s)
        lightness = Number.parseFloat(l)
      } catch (e) {
        console.error("Error parsing HSL values", e)
      }

      saturation /= 100
      lightness /= 100

      const c = (1 - Math.abs(2 * lightness - 1)) * saturation
      const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
      const m = lightness - c / 2
      let r = 0,
        g = 0,
        b = 0

      if (0 <= hue && hue < 60) {
        r = c
        g = x
        b = 0
      } else if (60 <= hue && hue < 120) {
        r = x
        g = c
        b = 0
      } else if (120 <= hue && hue < 180) {
        r = 0
        g = c
        b = x
      } else if (180 <= hue && hue < 240) {
        r = 0
        g = x
        b = c
      } else if (240 <= hue && hue < 300) {
        r = x
        g = 0
        b = c
      } else if (300 <= hue && hue < 360) {
        r = c
        g = 0
        b = x
      }

      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
      }
    }

    // Parse the HSL value
    let rgb = { r: 147, g: 51, b: 234 } // Default purple

    if (primaryColor.startsWith("hsl")) {
      const hslMatch = primaryColor.match(/hsl\(([0-9.]+)[^\d]+([0-9.]+)[^\d]+([0-9.]+)/)
      if (hslMatch && hslMatch.length >= 4) {
        rgb = hslToRgb(hslMatch[1], hslMatch[2], hslMatch[3])
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, `,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ")"
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = p.color + 0.2 * (1 - distance / connectionDistance) + ")"
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
      style={{ pointerEvents: "none" }}
    />
  )
}
