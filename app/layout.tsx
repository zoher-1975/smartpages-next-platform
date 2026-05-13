import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Smart Pages — WhatsApp-First Social Commerce',
    template: '%s · Smart Pages',
  },
  description: 'Turn social media traffic into WhatsApp sales. Mobile storefronts for merchants in Sudan, Gulf, and beyond.',
  keywords:    ['WhatsApp commerce', 'merchant storefront', 'social commerce', 'Sudan', 'Gulf'],
  authors:     [{ name: 'Smart Pages LTD' }],
  manifest:    '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Smart Pages' },
  openGraph:   { type: 'website', siteName: 'Smart Pages', locale: 'en_GB' },
  robots:      { index: true, follow: true },
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  viewportFit:  'cover',
  themeColor:   '#25D366',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sans:    Inter, system-ui, sans-serif;
            --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
          }
          body { font-family: var(--font-sans); }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
