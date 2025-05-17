import type { Metadata } from 'next'
import { Stick_No_Bills } from 'next/font/google'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Troll detector App',
  description: 'Troll Detector, Analyze Facebook profiles to detect potential trolls',
  generator: 'v0.dev & JERERE',
}
const StNoBills = Stick_No_Bills({
  subsets: ['latin'],
  variable: '--font-StNoBills', 
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={StNoBills.variable}>
      <body >{children}</body>
    </html>
  )
}
