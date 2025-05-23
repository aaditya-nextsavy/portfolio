'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider() {
  useEffect(() => {
    // 1. Force scroll to top (bypass Lenis)
    window.scrollTo({ top: 0, behavior: 'instant' })

    // 2. Disable scrolling
    document.body.style.overflowY = 'hidden'

    // 3. Initialize Lenis but pause it
    const lenis = new Lenis({
      duration: 0.5,
      smooth: true,
      easing: (t) => t,
    })
    lenis.stop() // Pause Lenis during the lock period

    // 4. Re-enable after 2 seconds
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto'
      document.body.style.overflowX = 'hidden'
      lenis.start() // Resume Lenis
    }, 2000)

    // Animation frame loop
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      clearTimeout(timer)
      lenis.destroy()
      document.body.style.overflow = 'auto' // Safety reset
    }
  }, [])

  return null
}