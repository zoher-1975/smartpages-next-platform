import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Smart Pages — WhatsApp-First Social Commerce',
    template: '%s · Smart Pages',
  },
  description: 'Turn social media traffic into WhatsApp sales. Build a branded mobile storefront and receive customer inquiries directly on WhatsApp.',
  keywords:    ['WhatsApp commerce', 'merchant storefront', 'social commerce', 'Sudan', 'Gulf', 'Sudanese beauty'],
  authors:     [{ name: 'Smart Pages LTD' }],
  creator:     'Smart Pages LTD',
  manifest:    '/manifest.json',
  appleWebApp: {
    capable:        true,
    statusBarStyle: 'black-translucent',
    title:          'Smart Pages',
  },
  openGraph: {
    type:      'website',
    siteName:  'Smart Pages',
    locale:    'en_GB',
    title:     'Smart Pages — WhatsApp-First Social Commerce',
    description: 'Build a mobile storefront. Receive inquiries on WhatsApp.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Smart Pages — WhatsApp-First Social Commerce',
    description: 'Build a mobile storefront. Receive inquiries on WhatsApp.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width:                'device-width',
  initialScale:         1,
  maximumScale:         5,
  viewportFit:          'cover',
  themeColor:           [
    { media: '(prefers-color-scheme: light)', color: '#25D366' },
    { media: '(prefers-color-scheme: dark)',  color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
