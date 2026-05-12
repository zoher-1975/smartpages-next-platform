import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { DEMO_MERCHANT } from '@/lib/demo-merchant'
import { getMerchantStatus, getFeaturedProducts } from '@/lib/utils'
import { StorefrontHeader } from '@/components/layout/StorefrontHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { MerchantHero } from '@/components/storefront/MerchantHero'
import { ProductCard } from '@/components/storefront/ProductCard'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'

// ── Merchant resolver (Phase 1: demo only; Phase 2: DB lookup by slug) ───────
function getMerchant(slug: string) {
  if (slug === DEMO_MERCHANT.slug) return DEMO_MERCHANT
  return null
}

import type { Viewport } from 'next'

// ── Viewport (per-merchant theme colour — served from CSS var at runtime) ─────
export const viewport: Viewport = { themeColor: '#7B3F00' }

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const merchant = getMerchant(params.slug)
  if (!merchant) return { title: 'Store not found' }
  return {
    title:       merchant.name,
    description: merchant.tagline,
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StorefrontHomePage({
  params,
}: {
  params: { slug: string }
}) {
  const merchant = getMerchant(params.slug)
  if (!merchant) notFound()

  const status   = getMerchantStatus(merchant)
  const featured = getFeaturedProducts(merchant)

  return (
    <>
      {/* Merchant CSS variable injection */}
      <style>{`
        :root {
          --merchant-primary:   ${merchant.colors.primary};
          --merchant-secondary: ${merchant.colors.secondary};
          --merchant-surface:   ${merchant.colors.surface};
          --merchant-text:      ${merchant.colors.text};
        }
      `}</style>

      <div className="page-container">
        <StorefrontHeader merchant={merchant} />

        {/* ── Hero ── */}
        <MerchantHero merchant={merchant} status={status} />

        {/* ── Campaign banner (first active campaign) ── */}
        {merchant.campaigns.filter(c => c.active).slice(0, 1).map(campaign => (
          <div key={campaign.id} className="mx-3 mt-4 rounded-2xl overflow-hidden relative">
            <div className="aspect-[16/7] relative bg-merchant-primary">
              <Image
                src={campaign.banner}
                alt={campaign.title}
                fill
                className="object-cover opacity-70"
                sizes="(max-width:480px) calc(100vw - 24px), 456px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent
                              flex flex-col justify-end p-4">
                <span className="text-2xs text-white/75 uppercase tracking-widest mb-1">
                  {campaign.subtitle}
                </span>
                <p className="text-xl font-black text-white leading-tight mb-3"
                   style={{ fontFamily: 'var(--font-league-spartan)' }}>
                  {campaign.title}<br />
                  <span className="text-merchant-secondary">{campaign.discountPct}% off</span>
                </p>
                <Link
                  href={`/store/${merchant.slug}/catalog?campaign=${campaign.id}`}
                  className="inline-flex items-center gap-1.5 self-start
                             bg-white/15 backdrop-blur border border-white/30
                             text-white text-xs font-semibold
                             px-3 py-1.5 rounded-full"
                >
                  Shop now →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* ── Categories ── */}
        <section className="mt-5">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <Link href={`/store/${merchant.slug}/catalog`} className="section-link">
              View all →
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {merchant.categories.map(cat => (
              <Link
                key={cat.id}
                href={`/store/${merchant.slug}/catalog?cat=${cat.id}`}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full border-2 border-merchant-border
                                overflow-hidden bg-merchant-surface
                                flex items-center justify-center">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-2xs text-merchant-text whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured products ── */}
        <section className="mt-5">
          <div className="section-header">
            <h2 className="section-title">Featured</h2>
            <Link href={`/store/${merchant.slug}/catalog`} className="section-link">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 px-3">
            {featured.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                merchant={merchant}
              />
            ))}
          </div>
        </section>

        {/* ── All products ── */}
        {merchant.products.length > featured.length && (
          <section className="mt-5">
            <div className="section-header">
              <h2 className="section-title">All Products</h2>
              <Link href={`/store/${merchant.slug}/catalog`} className="section-link">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 px-3">
              {merchant.products.filter(p => !p.featured && p.inStock).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  merchant={merchant}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── WhatsApp contact block ── */}
        <div className="mx-3 mt-6 p-5 rounded-2xl bg-merchant-surface
                        border border-merchant-border text-center">
          <p className="text-sm font-semibold text-merchant-text mb-1">Have a question?</p>
          <p className="text-xs text-merchant-muted mb-4 leading-relaxed">
            Chat with us directly on WhatsApp — we respond fast.
          </p>
          <div className="max-w-[240px] mx-auto">
            <WhatsAppCTA merchant={merchant} variant="compact" />
          </div>
        </div>

        <BottomNav merchant={merchant} />
      </div>
    </>
  )
}

// ── Static params (pre-renders /store/demo at build time) ──────────────────
export function generateStaticParams() {
  return [{ slug: 'demo' }]
}
