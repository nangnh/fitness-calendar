import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Open_Sans } from 'next/font/google'

import './globals.css'
import { AnalyticsClient } from '@/components/next-analytics'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-open-sans ${openSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <AnalyticsClient />
      </body>
    </html>
  )
}
