'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

export function PageAnimations({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    // SPLIT TEXT #########################################
    document.querySelectorAll('.heroSection h1').forEach((target) => {
      const el = target as HTMLElement
      if (el.dataset.split === 'true') return
      el.dataset.split = 'true'

      const split = new SplitText(el, {
        type: 'chars',
        charsClass: 'char',
      })

      gsap.set(split.chars, {
        autoAlpha: 0,
        y: 20,
      })

      gsap.to(split.chars, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none restart reset',
        },
      })
    })

    // REVEALS #########################################
    type RevealDirection = 'up' | 'down' | 'left' | 'right'

    function reveal(
      elements: Element | ArrayLike<Element>,
      {
        direction = 'up',
        stagger = 0,
        duration = 0.6,
        delay = 0,
        trigger,
      }: {
        direction?: RevealDirection
        stagger?: number
        duration?: number
        delay?: number
        trigger?: Element
      },
    ) {
      const targets = elements instanceof Element ? [elements] : Array.from(elements)

      if (!targets.length) return

      const dirMap: Record<RevealDirection, gsap.TweenVars> = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
      }

      gsap.fromTo(
        targets,
        {
          autoAlpha: 0,
          ...dirMap[direction],
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger ?? targets[0],
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        },
      )
    }

    document.querySelectorAll('.adminScreenRow').forEach((section) => {
      reveal(section.querySelectorAll('.text-first div, .image-first img'), {
        direction: 'right',
        duration: 1,
      })
    })

    document.querySelectorAll('.adminScreenRow').forEach((section) => {
      reveal(section.querySelectorAll('.text-first img, .image-first div'), {
        direction: 'left',
        duration: 1,
      })
    })

    document.querySelectorAll('.featuresGrid').forEach((section) => {
      reveal(section.querySelectorAll('.featureItem'), {
        direction: 'up',
        duration: 2,
        stagger: 0.5,
      })
    })

    // SPIN #########################################
    document.querySelectorAll('.topicItem').forEach((container) => {
      const items = container.querySelectorAll('img')
      if (!items.length) return

      if ((container as HTMLElement).dataset.spin === 'true') return
      ;(container as HTMLElement).dataset.spin = 'true'

      gsap.set(items, { transformOrigin: '50% 50%' })

      gsap.fromTo(
        items,
        { rotate: -180 },
        {
          rotate: 0,
          stagger: 0.5,
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        },
      )
    })
  }, [])

  return <>{children}</>
}
