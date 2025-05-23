'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef(null)
  const rafId = useRef(null)
  const progress = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      progress.current = (scrollPx / winHeight) * 100
      
      progressRef.current.style.transform = `scaleX(${progress.current / 100})`
      
      rafId.current = requestAnimationFrame(updateProgress)
    }

    const handleScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    updateProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={progressRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '0.3vw',
        width: '100%',
        // backgroundColor: '#ff98a2',
        backgroundColor:"var(--primary-color)",
        zIndex: 100,
        transformOrigin: 'left center',
        willChange: 'transform',
        transform: 'scaleX(0)',
        transition: 'transform 0.1s linear',
      }}
    />
  )
}