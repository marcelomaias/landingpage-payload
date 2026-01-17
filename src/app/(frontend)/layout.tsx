import React from 'react'
import { baseFont, headingFont } from '../../utils/fonts'

import './styles.css'
import { PageAnimations } from './components/gsap/PageAnimations'
import { Header } from './components/navigation/Header/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${baseFont.variable} ${headingFont.variable}`}>
      <PageAnimations>
        <body>
          <Header />
          {children}
        </body>
      </PageAnimations>
    </html>
  )
}
