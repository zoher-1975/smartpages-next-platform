import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Smart Pages — Merchant Commerce Platform',
    template: '%s · Smart Pages',
  },
  description: 'WhatsApp-first social commerce platform for merchants.',
  keywords:    ['WhatsApp commerce', 'merchant storefront', 'social commerce'],
  authors:     [{ name: 'Smart Pages LTD' }],
  manifest:    '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Smart Pages' },
  openGraph:   { type: 'website', siteName: 'Smart Pages', locale: 'en_GB' },
  robots:      { index: true, follow: true },
}

export const viewport: Viewport = {
  width:       'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor:  '#7B3F00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* League Spartan loaded at runtime from Google Fonts (not during build) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-inter:           Inter, system-ui, sans-serif;
            --font-league-spartan:  'League Spartan', system-ui, sans-serif;
          }
          body { font-family: var(--font-inter); }
        `}</style>
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
