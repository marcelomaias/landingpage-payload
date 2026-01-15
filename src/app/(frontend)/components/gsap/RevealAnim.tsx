'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealProps<T> {
  children: React.ReactNode
  content: T
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export function RevealAnim<T>({ children, content, direction = 'up', delay = 0 }: RevealProps<T>) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current || !content) return

      const offset = 50
      const x = direction === 'left' ? offset : direction === 'right' ? -offset : 0
      const y = direction === 'up' ? offset : direction === 'down' ? -offset : 0

      gsap.fromTo(
        container.current,
        {
          autoAlpha: 0,
          x,
          y,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 90%',
            toggleActions: 'play none restart reset',
          },
        },
      )
    },
    {
      scope: container,
      dependencies: [content],
    },
  )

  return (
    <div ref={container} style={{ visibility: 'hidden', opacity: 0 }}>
      {children}
    </div>
  )
}
