import type { Metadata } from 'next'
import Link from 'next/link'
import { DEMO_MERCHANT, DEMO_PRODUCTS } from '@/lib/demo-data'
import { ProductGrid } from '@/components/storefront/ProductCard'
import { WhatsAppContact } from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title:       'AmaniRenas Beauty — Smart Pages Demo Store',
  description: 'Authentic Sudanese African beauty products. Browse and order via WhatsApp.',
}

const CATEGORIES = ['All', 'Skincare', 'Body Care', 'Fragrance', 'Hair Care', 'Natural Oils', 'Gift Sets']

export default function DemoStorePage() {
  const merchant  = DEMO_MERCHANT
  const featured  = DEMO_PRODUCTS.filter(p => p.featured)
  const all       = DEMO_PRODUCTS

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Store Cover / Header ── */}
      <div className="relative"
           style={{ background: `linear-gradient(135deg, ${merchant.coverColor} 0%, #2c1500 100%)` }}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-safe pt-4 pb-0">
          <Link href="/" className="w-9 h-9 rounded-full bg-white/10 border border-white/20
                                    flex items-center justify-center text-white
                                    hover:bg-white/20 transition-colors text-sm">
            ←
          </Link>
          <Link href="/dashboard"
                className="text-xs text-white/70 hover:text-white transition-colors">
            Merchant Login
          </Link>
        </div>

        {/* Merchant info */}
        <div className="px-4 pt-4 pb-12">
          {/* Logo placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-white/15 border-2 border-white/30
                          flex items-center justify-center text-3xl mb-3">
            {merchant.emoji}
          </div>
          <h1 className="text-2xl font-black text-white mb-1">{merchant.name}</h1>
          <p className="text-sm text-white/75 mb-3 leading-relaxed max-w-xs">
            {merchant.tagline}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
            <span>📍 {merchant.location}</span>
            <span>⭐ {merchant.rating} ({merchant.reviews} reviews)</span>
            <span>✅ Verified merchant</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4">
            {[
              { v: merchant.productsCount, l: 'Products' },
              { v: merchant.rating,        l: 'Rating'   },
              { v: merchant.reviews,       l: 'Reviews'  },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-lg font-black text-white leading-none">{v}</p>
                <p className="text-2xs text-white/50 uppercase tracking-wide mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50 rounded-t-[28px]" />
      </div>

      {/* ── Response time badge ── */}
      <div className="relative z-10 -mt-4 mx-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
                        px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-700">Online now</span>
          </div>
          <WhatsAppContact
            whatsapp={merchant.whatsapp}
            label="Chat with us"
            className="text-xs"
          />
        </div>
      </div>

      {/* ── Category chips ── */}
      <div className="px-4 mt-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pb-2 w-max">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full
                          border transition-colors ${
                i === 0
                  ? 'bg-[#7B3F00] text-white border-[#7B3F00]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#7B3F00] hover:text-[#7B3F00]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured products ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">⭐ Featured</h2>
          <Link href="/store/demo/product/sample"
                className="text-xs text-[#7B3F00] font-medium">View all</Link>
        </div>
        <ProductGrid products={featured} whatsapp={merchant.whatsapp} />
      </div>

      {/* ── All products ── */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">All Products</h2>
          <span className="text-xs text-gray-400">{all.length} items</span>
        </div>
        <ProductGrid products={all} whatsapp={merchant.whatsapp} />
      </div>

      {/* ── WhatsApp contact block ── */}
      <div className="mx-4 mt-8 mb-6 p-5 bg-[#25D366]/5 border border-[#25D366]/20
                      rounded-2xl text-center">
        <p className="text-sm font-bold text-gray-900 mb-1">Questions? Ask us on WhatsApp</p>
        <p className="text-xs text-gray-500 mb-4">
          {merchant.responseTime}
        </p>
        <WhatsAppContact
          whatsapp={merchant.whatsapp}
          label="Start a conversation"
          className="text-sm font-bold justify-center"
        />
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-5 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Powered by{' '}
          <Link href="/" className="text-[#25D366] font-semibold">Smart Pages</Link>
          {' '}· WhatsApp-first commerce platform
        </p>
      </div>

    </div>
  )
}
