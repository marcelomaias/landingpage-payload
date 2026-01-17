'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import type { Header } from '@/payload-types'

interface MobileMenuProps {
  isOpen: boolean
  headerData: Header
  closeMenu: () => void
}

export default function MobileMenu({ isOpen, headerData, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isOpen) {
        // Open Animation
        gsap.to(menuRef.current, {
          x: '0%',
          duration: 0.6,
          ease: 'power4.out',
        })
        gsap.to('.mobileLink', {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        })
        document.body.style.overflow = 'hidden'
      } else {
        // Close Animation
        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.5,
          ease: 'power4.in',
        })
        gsap.to('.mobileLink', {
          opacity: 0,
          y: 20,
          duration: 0.2,
        })
        document.body.style.overflow = ''
      }
    },
    { dependencies: [isOpen], scope: menuRef },
  )

  const allLinks = [...(headerData.headerLinksLeft || []), ...(headerData.headerLinksRight || [])]

  return (
    <div ref={menuRef} className="mobileMenu">
      {allLinks.map((link, i) => (
        <a key={i} href={link.path || '#'} className="mobileLink" onClick={closeMenu}>
          {link.title}
        </a>
      ))}
    </div>
  )
}
