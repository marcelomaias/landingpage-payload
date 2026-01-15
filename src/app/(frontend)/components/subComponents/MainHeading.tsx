'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register ScrollTrigger and the React hook
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

import { RichText } from '@payloadcms/richtext-lexical/react'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface AnimatedMainHeading {
  data: SerializedEditorState
  className?: string
}

export function MainHeading({ data, className }: AnimatedMainHeading) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!container.current) return

      const h1 = container.current.querySelector('h1')
      if (!h1) return

      const split = new SplitText(h1, { type: 'chars, words' })

      gsap.set(split.chars, { opacity: 0, y: 30 })

      gsap.set(h1, { autoAlpha: 1 })

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: h1,
          start: 'top 80%', // Starts when top of H1 hits 80% of viewport
          end: 'bottom 20%',
          // Actions: play (on enter), none (on leave), restart (on enter back), reset (on leave back)
          toggleActions: 'play none restart reset',
        },
      })
    },
    { scope: container, dependencies: [data] },
  )

  return (
    <div ref={container} className={className}>
      <RichText data={data} />
    </div>
  )
}
