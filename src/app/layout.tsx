import './globals.scss'
import type { Metadata } from 'next'
import { Noto_Serif, Space_Mono } from 'next/font/google'
import { ChakraProviders } from '~/components/ChakraProviders'
import { Inter } from 'next/font/google'

const ns = Noto_Serif({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const sm = Space_Mono( {
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Spotter Exercise',
  description: 'TrackList for beats',
}

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[ns.variable, sm.variable].join(' ')}>
      <body className={inter.className}>
      <ChakraProviders>
      {children}
      </ChakraProviders>
      </body>
    </html>
  )
}
