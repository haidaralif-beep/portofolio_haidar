import { Geist, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' })

// oxlint-disable-next-line react/only-export-components -- Next.js metadata export pattern
export const metadata = {
  title: 'HAIDAR. - Digital Ecosystem',
  description:
    'Portfolio of HAIDAR — a web developer building modern digital experiences that combine clean design, thoughtful interaction, and reliable technology.',
  openGraph: {
    title: 'HAIDAR. - Digital Ecosystem',
    description:
      'Portfolio of HAIDAR — a web developer building modern digital experiences that combine clean design, thoughtful interaction, and reliable technology.',
    type: 'website',
    url: 'https://portfolio-haidar.vercel.app',
    siteName: 'HAIDAR.',
  },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
}

// oxlint-disable-next-line react/only-export-components -- Next.js viewport export pattern
export const viewport = {
  themeColor: '#050807',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}