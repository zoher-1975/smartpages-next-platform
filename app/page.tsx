import Link from 'next/link'
import { MessageCircle, LayoutDashboard, ShieldCheck, ArrowRight } from 'lucide-react'

// ── Platform landing page at / ────────────────────────────────────────────────
// This is NOT a merchant storefront. It's the platform homepage shown when
// visiting the root URL — explains the product and links to demo / dashboard.
// Phase 2: becomes the SaaS marketing/signup page.

export default function PlatformLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0d00] via-[#2c1500] to-[#1a0d00]">
      <div className="page-container px-6 pt-20 pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                        text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <MessageCircle size={12} className="text-whatsapp" />
          WhatsApp-First Commerce Platform
        </div>

        {/* Logo / brand mark */}
        <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20
                        flex items-center justify-center mb-6">
          <span className="text-3xl font-black text-white font-display">SP</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-league-spartan)' }}>
          Smart Pages
        </h1>
        <p className="text-base text-white/70 leading-relaxed mb-12 max-w-xs">
          A WhatsApp-first merchant catalogue platform. Customers browse, tap, and
          inquire — merchants receive leads directly on WhatsApp.
        </p>

        {/* Primary CTA */}
        <Link
          href="/store/demo"
          className="btn-whatsapp max-w-xs mb-4"
        >
          <MessageCircle size={20} />
          View Demo Storefront
          <ArrowRight size={16} className="ml-auto" />
        </Link>

        {/* Secondary CTAs */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 py-3.5 px-5
                       bg-white/10 border border-white/20 text-white
                       rounded-xl text-sm font-semibold
                       hover:bg-white/15 transition-colors"
          >
            <LayoutDashboard size={16} />
            Merchant Dashboard
          </Link>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 py-3.5 px-5
                       bg-white/10 border border-white/20 text-white/60
                       rounded-xl text-sm font-medium
                       hover:bg-white/15 transition-colors"
          >
            <ShieldCheck size={16} />
            Platform Admin
          </Link>
        </div>

        {/* Feature bullets */}
        <div className="mt-16 grid grid-cols-1 gap-4 w-full text-left">
          {[
            { icon: '🛍️', title: 'No cart. No checkout.',    body: 'Every product page has one button: WhatsApp. Customers inquire; you close the sale.' },
            { icon: '🆔', title: 'Inquiry tracking IDs',     body: 'Every message includes a unique INQ-xxxxx reference so you never lose a lead.' },
            { icon: '🎨', title: 'Per-merchant theming',      body: 'Brand colours, logo, and WhatsApp number — fully configurable per merchant.' },
            { icon: '📱', title: 'PWA-ready',                 body: 'Installable on iOS and Android. Works offline. Feels like a native app.' },
          ].map(({ icon, title, body }) => (
            <div key={title}
                 className="bg-white/5 border border-white/10 rounded-xl p-4
                            flex gap-3 items-start">
              <span className="text-2xl leading-none mt-0.5">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
                <p className="text-xs text-white/60 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-12 text-2xs text-white/30">
          Smart Pages LTD · Phase 1 · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  )
}
