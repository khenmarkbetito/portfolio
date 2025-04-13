"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useThreeContext } from "@/context/three-context"

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentSection } = useThreeContext()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10

      // Color - blue/purple palette
      if (i % 3 === 0) {
        colorArray[i] = 0.1 + Math.random() * 0.2 // R
      } else if (i % 3 === 1) {
        colorArray[i] = 0.1 + Math.random() * 0.1 // G
      } else {
        colorArray[i] = 0.4 + Math.random() * 0.6 // B
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05

      // Interactive movement
      particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.05
      particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.05

      // Section-specific animations
      if (currentSection === "home") {
        particlesMesh.rotation.y = elapsedTime * 0.05
      } else if (currentSection === "about") {
        particlesMesh.rotation.x = elapsedTime * 0.05
      } else if (currentSection === "projects") {
        particlesMesh.rotation.z = elapsedTime * 0.05
      } else if (currentSection === "contact") {
        particlesMesh.rotation.y = Math.sin(elapsedTime) * 0.2
        particlesMesh.rotation.x = Math.cos(elapsedTime) * 0.2
      }

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeChild(renderer.domElement)

      // Dispose resources
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [currentSection])

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a1e38] to-[#051022]" />
}
