'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

interface FadeInProps {
  children: React.ReactNode
  // This allows strings, rich text objects, or even arrays
  content: string | number | SerializedEditorState | null | undefined
  stagger?: number
  duration?: number
}

export const SplitTextAnim: React.FC<FadeInProps> = ({
  children,
  content,
  stagger = 0.02,
  duration = 0.8,
}) => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // If content is empty, don't run the animation logic
      if (!container.current || !content) return

      const target = container.current.querySelector('h1, h2, p')
      if (!target) return

      const split = new SplitText(target, {
        type: 'chars',
        charsClass: 'char',
      })

      gsap.to(split.chars, {
        autoAlpha: 1, // Flips visibility to 'visible' and opacity to 1
        y: 0,
        stagger: stagger,
        duration: duration,
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
          toggleActions: 'play none restart reset',
        },
      })
    },
    {
      scope: container,
      dependencies: [content], // Re-runs correctly for string or object changes
    },
  )

  return <div ref={container}>{children}</div>
}
