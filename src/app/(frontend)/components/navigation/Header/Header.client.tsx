'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState, useRef } from 'react'
import type { Header } from '@/payload-types'
import Image from 'next/image'
import Hamburger from './Hamburger'
import MobileMenu from './MobileMenu'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeaderClient({ headerData }: { headerData: Header }) {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useGSAP(
    () => {
      // Timeline works on ALL screen sizes now
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=100',
          scrub: 1,
        },
      })

      tl.to(
        navRef.current,
        {
          backgroundColor: 'rgba(247, 152, 104, 0.95)',
          // backdropFilter: 'blur(10px)',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)',
          paddingTop: '0.1rem', // Use a small value instead of 0 to avoid 'cramped' mobile feel
          paddingBottom: '0.1rem',
          duration: 1,
        },
        0,
      )

      tl.to(
        logoRef.current,
        {
          scale: 0.8, // Slightly less aggressive scale for mobile
          // If logo is centered on mobile, use "center center",
          // if left-aligned, use "left center"
          transformOrigin: 'center center',
          duration: 1,
        },
        0,
      )
    },
    { scope: navRef },
  )

  return (
    <>
      <header ref={navRef} className="headerSection">
        <div className="container">
          <div className="mainHeader">
            {/* Desktop Nav Left */}
            <nav className="linksLeft hideMobile">
              {headerData?.headerLinksLeft?.map((link, index) => (
                <a key={index} href={link.path || '#'}>
                  {link.title}
                </a>
              ))}
            </nav>

            {/* Logo - Works for both */}
            <div className="logo">
              {typeof headerData?.logo === 'object' && headerData?.logo?.url && (
                <Image
                  ref={logoRef}
                  src={headerData.logo.url}
                  alt={headerData.logo.alt || 'Logo'}
                  width={200} // Use a more reasonable width for the actual render
                  height={60}
                  priority
                />
              )}
            </div>

            {/* Desktop Nav Right */}
            <nav className="linksRight hideMobile">
              {headerData?.headerLinksRight?.map((link, index) => (
                <a key={index} href={link.path || '#'}>
                  {link.title}
                </a>
              ))}
            </nav>

            <Hamburger isActive={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </header>

      {/* Mobile Menu - Move outside <header> if you want it to cover the whole screen easily */}
      <MobileMenu
        isOpen={isMenuOpen}
        headerData={headerData}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </>
  )
}
