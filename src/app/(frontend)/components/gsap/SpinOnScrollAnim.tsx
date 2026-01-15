'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SpinOnScrollAnimProps<T> {
  content: T
  containerSelector?: string
  itemSelector?: string
  rotations?: number
  stagger?: number
  start?: string
  end?: string
}

export function SpinOnScrollAnim<T>({
  content,
  containerSelector = '[data-spin-container="topics"]',
  itemSelector = '[data-spin-item]',
  rotations = 1,
  stagger = 0.15,
  start = 'top 85%',
  end = 'top 65%',
}: SpinOnScrollAnimProps<T>) {
  useGSAP(
    () => {
      if (!content) return

      const container = document.querySelector(containerSelector)
      if (!container) return

      const items = container.querySelectorAll(itemSelector)
      if (!items.length) return

      gsap.fromTo(
        items,
        {
          rotate: -rotations * 360,
        },
        {
          rotate: 0,
          ease: 'none',
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
            end,
            scrub: 1,
          },
        },
      )
    },
    {
      dependencies: [content],
    },
  )

  return null
}
