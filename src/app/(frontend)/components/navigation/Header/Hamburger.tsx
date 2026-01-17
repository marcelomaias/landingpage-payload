'use client'

interface HamburgerProps {
  isActive: boolean
  toggle: () => void
}

export default function Hamburger({ isActive, toggle }: HamburgerProps) {
  return (
    <button
      className={`hideDesktop hamburger hamburger--slider ${isActive ? 'is-active' : ''}`}
      type="button"
      aria-label="Menu"
      aria-expanded={isActive}
      onClick={toggle} // Triggers the parent's state change
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  )
}
