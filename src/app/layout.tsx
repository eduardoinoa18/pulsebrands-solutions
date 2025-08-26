import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk, Poppins } from 'next/font/google'
import Link from 'next/link'

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-poppins' })

export const metadata: Metadata = {
  metadataBase: new URL('https://pulsebrandsolutions.com'),
  title: {
    default: 'PulseBrand Solutions — Your Brand, Delivered.',
    template: '%s — PulseBrand Solutions',
  },
  description: 'Custom packaging, apparel, and logistics for youth-driven businesses that scale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${poppins.variable}`}>
      <body>
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/70 border-b border-white/10">
          <div className="container flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 font-heading tracking-wide">
              <span className="inline-block h-2 w-6 bg-neonBlue rounded-full shadow-[0_0_16px_2px_rgba(0,229,255,0.6)]" aria-hidden />
              <span className="text-sm md:text-base">PulseBrand Solutions</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#" className="hover:text-neonBlue">Home</Link>
              <Link href="/#services" className="hover:text-neonBlue">Services</Link>
              <Link href="/#pricing" className="hover:text-neonBlue">Pricing</Link>
              <Link href="/#contact" className="hover:text-neonBlue">Contact</Link>
              <Link href="/#contact" className="btn-primary">Get Started</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
