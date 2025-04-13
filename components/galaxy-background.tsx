"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface Star {
  x: number
  y: number
  z: number
  size: number
  color: string
  opacity: number
  speed: number
  angle: number
  distance: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen with device pixel ratio for sharper rendering
    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Galaxy settings
    const starCount = isMobile ? 200 : 500 // Reduced count for better performance
    const stars: Star[] = []
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const galaxyRadius = Math.max(window.innerWidth, window.innerHeight) * 0.8

    // Nebula colors with reduced opacity for better performance
    const nebulaColors = [
      { r: 63, g: 81, b: 181, a: 0.02 }, // Blue
      { r: 156, g: 39, b: 176, a: 0.02 }, // Purple
      { r: 233, g: 30, b: 99, a: 0.01 }, // Pink
      { r: 3, g: 169, b: 244, a: 0.01 }, // Light Blue
    ]

    // Star colors
    const starColors = [
      "255, 255, 255", // White
      "216, 195, 255", // Light Purple
      "155, 176, 255", // Light Blue
      "170, 191, 255", // Blue-White
      "255, 244, 234", // Warm White
      "255, 210, 161", // Yellowish
      "255, 204, 111", // Yellow
    ]

    // Pre-render nebula clouds to an offscreen canvas for better performance
    const nebulaCanvas = document.createElement("canvas")
    nebulaCanvas.width = window.innerWidth
    nebulaCanvas.height = window.innerHeight
    const nebulaCtx = nebulaCanvas.getContext("2d")

    if (nebulaCtx) {
      // Draw nebula clouds
      for (let i = 0; i < 8; i++) {
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const radius = 100 + Math.random() * 300

        const gradient = nebulaCtx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 2})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        nebulaCtx.fillStyle = gradient
        nebulaCtx.beginPath()
        nebulaCtx.arc(x, y, radius, 0, Math.PI * 2)
        nebulaCtx.fill()
      }
    }

    // Create stars with galaxy distribution
    for (let i = 0; i < starCount; i++) {
      // Create spiral galaxy distribution
      const distance = Math.random() * galaxyRadius
      const spiralFactor = 5 // Controls how tight the spiral is
      const angle = Math.random() * Math.PI * 2 + (distance / galaxyRadius) * spiralFactor

      // Add some randomness to the spiral
      const randomOffset = (Math.random() - 0.5) * 0.2 * distance
      const x = centerX + Math.cos(angle) * distance + randomOffset
      const y = centerY + Math.sin(angle) * distance + randomOffset

      // Z-depth for parallax effect (0 is far, 1 is close)
      const z = Math.random()

      // Size based on z-depth (closer stars are larger)
      const baseSize = Math.random() * 1.5 + 0.5
      const size = baseSize * (0.3 + z * 0.7)

      // Randomly select a star color
      const colorIndex = Math.floor(Math.random() * starColors.length)
      const color = starColors[colorIndex]

      // Opacity varies with size and random factor
      const opacity = 0.2 + Math.random() * 0.8

      // Orbital speed (smaller near center, larger at edges)
      // Reduced speed for smoother animation
      const speed = 0.00005 + (0.00002 * distance) / galaxyRadius

      // Twinkle effect
      const twinkleSpeed = 0.005 + Math.random() * 0.01 // Reduced for smoother twinkle
      const twinklePhase = Math.random() * Math.PI * 2

      stars.push({
        x,
        y,
        z,
        size,
        color,
        opacity,
        speed,
        angle,
        distance,
        twinkleSpeed,
        twinklePhase,
      })
    }

    // Create shooting stars
    const shootingStars: {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      active: boolean
      timeToNext: number
    }[] = []

    for (let i = 0; i < 3; i++) {
      // Reduced count for better performance
      shootingStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: 50 + Math.random() * 100,
        speed: 3 + Math.random() * 10, // Reduced speed for smoother movement
        angle: Math.random() * Math.PI * 2,
        opacity: 0,
        active: false,
        timeToNext: Math.random() * 200,
      })
    }

    let rotation = 0

    // Animation loop with time-based animation
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp

      // Calculate delta time in seconds for smooth animation regardless of frame rate
      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp

      // Limit delta time to prevent large jumps after tab switching or low FPS
      const smoothDelta = Math.min(deltaTime, 0.05)

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw background gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius)
      bgGradient.addColorStop(0, "rgba(20, 10, 30, 0.4)")
      bgGradient.addColorStop(0.5, "rgba(10, 10, 20, 0.2)")
      bgGradient.addColorStop(1, "rgba(0, 0, 10, 0)")

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw pre-rendered nebula clouds
      ctx.drawImage(nebulaCanvas, 0, 0, window.innerWidth, window.innerHeight)

      // Slowly rotate the entire galaxy - use smooth delta time
      rotation += 0.00005 * smoothDelta * 60 // Normalized to 60fps

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Rotate stars around the center - use smooth delta time
        star.angle += star.speed * smoothDelta * 60 // Normalized to 60fps

        // Calculate new position with smooth rotation
        star.x = centerX + Math.cos(star.angle + rotation) * star.distance
        star.y = centerY + Math.sin(star.angle + rotation) * star.distance

        // Twinkle effect - use timestamp for smooth animation
        const twinkle = 0.5 + Math.sin(timestamp * star.twinkleSpeed * 0.001 + star.twinklePhase) * 0.5
        const currentOpacity = star.opacity * twinkle

        // Draw star glow (for larger stars)
        if (star.size > 1.2) {
          const glowSize = star.size * 4
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize)
          gradient.addColorStop(0, `rgba(${star.color}, ${currentOpacity * 0.5})`)
          gradient.addColorStop(1, `rgba(${star.color}, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw star
        ctx.fillStyle = `rgba(${star.color}, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update and draw shooting stars with smooth animation
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i]

        if (star.active) {
          // Move shooting star with delta time for smooth movement
          star.x += Math.cos(star.angle) * star.speed * smoothDelta * 60
          star.y += Math.sin(star.angle) * star.speed * smoothDelta * 60

          // Check if out of bounds
          if (
            star.x < -star.length ||
            star.x > window.innerWidth + star.length ||
            star.y < -star.length ||
            star.y > window.innerHeight + star.length
          ) {
            star.active = false
            star.timeToNext = 100 + Math.random() * 200
          }

          // Draw shooting star
          const tailX = star.x - Math.cos(star.angle) * star.length
          const tailY = star.y - Math.sin(star.angle) * star.length

          const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y)
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
          gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(star.x, star.y)
          ctx.stroke()

          // Draw head of shooting star
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Count down to next appearance with delta time
          star.timeToNext -= smoothDelta * 60 // Normalized to 60fps

          if (star.timeToNext <= 0) {
            // Reset shooting star
            star.x = Math.random() * window.innerWidth
            star.y = Math.random() * window.innerHeight
            star.angle = Math.random() * Math.PI * 2
            star.opacity = 0.7 + Math.random() * 0.3
            star.active = true
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: "none", background: "linear-gradient(to bottom, #0f0f23, #090918)" }}
    />
  )
}
