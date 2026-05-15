import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DEMO_MERCHANT, DEMO_PRODUCTS,
  buildStoreShareWA, buildFacebookShareUrl, buildTelegramShareUrl,
} from '@/lib/demo-data'
import { ProductGrid } from '@/components/storefront/ProductCard'
import { WhatsAppContact } from '@/components/ui/WhatsAppButton'
import { ShareBarClient } from '@/components/ui/ShareBarClient'
import { SocialLinks } from '@/components/ui/SocialLinks'

export const metadata: Metadata = {
  title:       'AmaniRenas Beauty · Smart Pages Demo',
  description: 'Authentic Sudanese African beauty products. Browse our catalogue and order via WhatsApp.',
}

export default function DemoStorePage() {
  const m        = DEMO_MERCHANT
  const featured = DEMO_PRODUCTS.filter(p => p.featured)
  const all      = DEMO_PRODUCTS

  const BASE_URL = 'https://smartpages-next-platform-puce.vercel.app'
  const pageUrl  = `${BASE_URL}/store/${m.slug}`
  const waUrl    = buildStoreShareWA(m, pageUrl)
  const fbUrl    = buildFacebookShareUrl(pageUrl)
  const tgUrl    = buildTelegramShareUrl(`${m.emoji} ${m.name} — ${m.tagline}`, pageUrl)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Store Cover ── */}
      <div className="relative overflow-hidden"
           style={{ background: `linear-gradient(160deg, ${m.coverColor} 0%, #1f0f00 100%)` }}>
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[#D4AF37]/10 blur-xl" />

        {/* Top row: back + login */}
        <div className="flex items-center justify-between px-4 pt-12 pb-0 relative z-10">
          <Link href="/"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20
                           flex items-center justify-center text-white text-sm font-bold
                           hover:bg-white/20 transition-colors backdrop-blur-sm">
            ←
          </Link>
          <Link href="/dashboard"
                className="text-xs text-white/60 hover:text-white transition-colors">
            Merchant Login
          </Link>
        </div>

        {/* Merchant info */}
        <div className="px-4 pt-5 pb-14 relative z-10">
          {/* Logo / avatar */}
          <div className="w-16 h-16 rounded-2xl bg-white/15 border-2 border-white/25
                          backdrop-blur-sm flex items-center justify-center text-4xl mb-4
                          shadow-lg">
            {m.emoji}
          </div>

          <h1 className="text-2xl font-black text-white mb-1 leading-tight">{m.name}</h1>
          <p className="text-sm text-white/70 mb-4 leading-relaxed max-w-xs">{m.tagline}</p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="flex items-center gap-1 bg-white/10 border border-white/15
                             text-white/80 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              📍 {m.location}
            </span>
            <span className="flex items-center gap-1 bg-white/10 border border-white/15
                             text-white/80 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              ⭐ {m.rating} · {m.reviews} reviews
            </span>
            {m.verified && (
              <span className="flex items-center gap-1 bg-[#25D366]/20 border border-[#25D366]/30
                               text-[#25D366] text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                ✅ Verified
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { v: m.productsCount, l: 'Products' },
              { v: `${m.rating}★`,  l: 'Rating'   },
              { v: m.reviews,       l: 'Reviews'  },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="text-lg font-black text-white leading-none">{v}</p>
                <p className="text-2xs text-white/50 uppercase tracking-wide mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curved bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50 rounded-t-[28px]" />
      </div>

      {/* ── Floating status card ── */}
      <div className="mx-3 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card
                        px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <div>
              <p className="text-xs font-bold text-green-700">Open now</p>
              <p className="text-2xs text-gray-400">{m.responseTime}</p>
            </div>
          </div>
          <WhatsAppContact whatsapp={m.whatsapp} label="Chat with us"
                           className="text-xs font-bold" />
        </div>
      </div>

      {/* ── Category chips ── */}
      <div className="px-3 mt-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pb-1 w-max">
          {['All', 'Skincare', 'Body Care', 'Fragrance', 'Hair Care', 'Gift Sets'].map((cat, i) => (
            <button key={cat}
                    className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full
                                border transition-all whitespace-nowrap ${
                      i === 0
                        ? 'bg-[#7B3F00] text-white border-[#7B3F00] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#7B3F00] hover:text-[#7B3F00]'
                    }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured ── */}
      <div className="px-3 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">⭐ Featured</h2>
          <Link href="/store/demo/product/sample"
                className="text-xs text-[#7B3F00] font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} whatsapp={m.whatsapp} />
      </div>

      {/* ── All products ── */}
      <div className="px-3 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">All Products</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
            {all.length} items
          </span>
        </div>
        <ProductGrid products={all} whatsapp={m.whatsapp} />
      </div>

      {/* ── Share this store ── */}
      <div className="mx-3 mt-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-card">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Share this store
        </p>
        <ShareBarClient waUrl={waUrl} fbUrl={fbUrl} tgUrl={tgUrl} copyUrl={pageUrl} eventPrefix="store" />
      </div>

      {/* ── Social links ── */}
      <div className="mx-3 mt-3 p-4 bg-white rounded-2xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Follow us</p>
        <SocialLinks social={m.social} variant="grid" />
      </div>

      {/* ── Campaign catalog links ── */}
      <div className="mx-3 mt-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1 mb-2">
          Campaigns
        </p>
        <div className="flex flex-col gap-2">
          {[
            { id: 'camp_01', name: '🌙 Ramadan Special', sub: '15% off · Active', color: 'bg-green-50 border-green-200 text-green-700' },
            { id: 'camp_02', name: '🎁 Eid Gift Bundle',  sub: 'Coming Apr 10',    color: 'bg-blue-50  border-blue-200  text-blue-700'  },
          ].map(c => (
            <Link key={c.id} href={`/store/demo/campaign/${c.id}`}
                  className="flex items-center justify-between bg-white border border-gray-100
                             rounded-xl px-4 py-3 hover:shadow-card transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.color}`}>View →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── WhatsApp block ── */}
      <div className="mx-3 mt-8 mb-6 p-5 rounded-3xl
                      bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10
                      border border-[#25D366]/20 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center
                        mx-auto mb-3 shadow-wa">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">Questions? We reply fast.</p>
        <p className="text-xs text-gray-500 mb-4">{m.responseTime}</p>
        <WhatsAppContact whatsapp={m.whatsapp} label="Start a conversation"
                         className="text-sm font-bold justify-center" />
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-5 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Powered by{' '}
          <Link href="/" className="text-[#25D366] font-semibold hover:underline">
            Smart Pages
          </Link>
          {' '}· WhatsApp-first commerce
        </p>
      </div>
    </div>
  )
}
