import { Inter, Playfair_Display } from 'next/font/google'

export const baseFont = Inter({
  subsets: ['latin'],
  variable: '--font-base',
})
export const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
})
