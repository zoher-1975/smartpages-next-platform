import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  DEMO_MERCHANT, DEMO_PRODUCTS, DEMO_CAMPAIGNS,
  buildCampaignShareWA, buildFacebookShareUrl, buildTelegramShareUrl,
} from '@/lib/demo-data'
import { ProductGrid } from '@/components/storefront/ProductCard'
import { ShareBarClient } from '@/components/ui/ShareBarClient'

export function generateStaticParams() {
  return DEMO_CAMPAIGNS.map(c => ({ id: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const campaign = DEMO_CAMPAIGNS.find(c => c.id === params.id)
  if (!campaign) return { title: 'Campaign not found' }
  return {
    title:       `${campaign.name} · ${DEMO_MERCHANT.name}`,
    description: `${campaign.name} — ${campaign.discount ?? ''} at ${DEMO_MERCHANT.name}`,
  }
}

export default function CampaignPage({ params }: { params: { id: string } }) {
  const campaign  = DEMO_CAMPAIGNS.find(c => c.id === params.id)
  if (!campaign) notFound()

  const merchant = DEMO_MERCHANT
  const products = DEMO_PRODUCTS.filter(p => p.featured).slice(0, 4) // demo: show featured products

  const BASE_URL = 'https://smartpages-next-platform-puce.vercel.app'
  const pageUrl  = `${BASE_URL}/store/demo/campaign/${campaign.id}`
  const waUrl    = buildCampaignShareWA(merchant, campaign, pageUrl)
  const fbUrl    = buildFacebookShareUrl(pageUrl)
  const tgText   = `${campaign.emoji ?? '✨'} ${campaign.name} — ${merchant.name}`
  const tgUrl    = buildTelegramShareUrl(tgText, pageUrl)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center h-14 px-4 gap-3">
          <Link href={`/store/${merchant.slug}`}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center
                           hover:bg-gray-200 transition-colors font-bold text-gray-700 text-sm flex-shrink-0">
            ←
          </Link>
          <span className="flex-1 text-sm font-semibold text-gray-900 truncate">
            {campaign.emoji} {campaign.name}
          </span>
        </div>
      </div>

      {/* ── Campaign Hero ── */}
      <div className="relative overflow-hidden"
           style={{ background: `linear-gradient(160deg, ${merchant.coverColor} 0%, #1f0f00 100%)` }}>
        {/* Decorative */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="px-4 pt-8 pb-14 relative z-10">
          <div className="text-5xl mb-4">{campaign.emoji ?? '✨'}</div>
          <h1 className="text-2xl font-black text-white mb-1">{campaign.name}</h1>
          <p className="text-sm text-white/70 mb-4">
            {merchant.name} · Ends {campaign.endDate}
          </p>
          {campaign.discount && (
            <span className="inline-block bg-[#25D366] text-white text-xs font-black
                             px-3 py-1.5 rounded-full">
              🏷️ {campaign.discount}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50 rounded-t-[28px]" />
      </div>

      {/* ── Share bar ── */}
      <div className="mx-3 -mt-4 relative z-10 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Share this campaign
          </p>
          <ShareBarClient
            waUrl={waUrl} fbUrl={fbUrl} tgUrl={tgUrl} copyUrl={pageUrl}
            eventPrefix="campaign"
          />
        </div>
      </div>

      {/* ── Products ── */}
      <div className="px-3 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Products in this campaign</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
            {products.length} items
          </span>
        </div>
        <ProductGrid products={products} whatsapp={merchant.whatsapp} />
      </div>

      {/* ── Caption preview ── */}
      {campaign.caption && (
        <div className="mx-3 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                📸 Ready caption for Instagram / Facebook
              </p>
            </div>
            <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans
                            bg-gray-50 rounded-xl p-3 max-h-48 overflow-y-auto">
              {campaign.caption}
            </pre>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="px-4 py-5 border-t border-gray-100 text-center mb-4">
        <p className="text-xs text-gray-400">
          Powered by{' '}
          <Link href="/" className="text-[#25D366] font-semibold hover:underline">Smart Pages</Link>
          {' '}· WhatsApp-first commerce
        </p>
      </div>
    </div>
  )
}
