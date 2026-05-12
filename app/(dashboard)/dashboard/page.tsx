import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  MessageCircle, Eye, BarChart2, Package,
  ExternalLink, ToggleLeft, ToggleRight
} from 'lucide-react'
import { DEMO_MERCHANT } from '@/lib/demo-merchant'
import { getMerchantStatus, formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Merchant Dashboard',
  description: 'Manage your WhatsApp commerce storefront',
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, subUp, icon: Icon, iconColor,
}: {
  label:     string
  value:     string | number
  sub?:      string
  subUp?:    boolean
  icon:      React.ElementType
  iconColor: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
          {label}
        </span>
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon size={16} />
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 leading-none mb-1"
         style={{ fontFamily: 'var(--font-league-spartan)' }}>
        {value}
      </p>
      {sub && (
        <p className={`text-xs ${subUp ? 'text-green-600' : 'text-gray-400'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const merchant = DEMO_MERCHANT
  const status   = getMerchantStatus(merchant)
  const sym      = merchant.currencySymbol

  // Phase 1: empty state (no real data yet; localStorage filled after WA taps)
  const stats = {
    waTaps:   0,
    views:    0,
    inquiries: 0,
    products: merchant.products.length,
  }

  return (
    <>
      <style>{`
        :root {
          --merchant-primary:   ${merchant.colors.primary};
          --merchant-secondary: ${merchant.colors.secondary};
          --merchant-surface:   ${merchant.colors.surface};
          --merchant-text:      ${merchant.colors.text};
        }
      `}</style>

      <div className="page-container bg-gray-50 min-h-screen">

        {/* ── Header ── */}
        <div className="px-4 pt-12 pb-12"
             style={{ background: `linear-gradient(135deg, ${merchant.colors.primary} 0%, #2c1500 100%)` }}>
          <p className="text-xs text-white/60 mb-0.5">Good day,</p>
          <h1 className="text-xl font-black text-white"
              style={{ fontFamily: 'var(--font-league-spartan)' }}>
            {merchant.name}
          </h1>
        </div>

        {/* ── Store status card (floats over header) ── */}
        <div className="mx-3 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4
                          flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-merchant-surface">
              <Image
                src={merchant.logo}
                alt={merchant.name}
                width={48} height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate"
                 style={{ fontFamily: 'var(--font-league-spartan)' }}>
                {merchant.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{merchant.tagline}</p>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              {status.online
                ? <ToggleRight size={28} className="text-green-500" />
                : <ToggleLeft  size={28} className="text-gray-300"  />}
              <span className={`text-2xs font-medium ${status.online ? 'text-green-600' : 'text-gray-400'}`}>
                {status.online ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-3 px-3 mt-4">
          <StatCard label="WA Taps"   value={stats.waTaps}    icon={MessageCircle} iconColor="bg-green-50 text-green-600"  sub="last 7 days"  />
          <StatCard label="Inquiries" value={stats.inquiries} icon={BarChart2}     iconColor="bg-blue-50 text-blue-600"    sub="stored total" />
          <StatCard label="Page Views" value={stats.views}   icon={Eye}           iconColor="bg-purple-50 text-purple-600" sub="last 7 days"  />
          <StatCard label="Products"  value={stats.products} icon={Package}       iconColor="bg-amber-50 text-amber-600"  sub="in catalogue" />
        </div>

        {/* ── View storefront CTA ── */}
        <div className="px-3 mt-4">
          <Link
            href={`/store/${merchant.slug}`}
            className="flex items-center justify-center gap-2
                       w-full py-3.5 rounded-xl
                       bg-merchant-primary text-white
                       text-sm font-semibold"
          >
            <ExternalLink size={16} />
            View Your Storefront
          </Link>
        </div>

        {/* ── Quick actions ── */}
        <section className="px-3 mt-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Products',  href: `/store/${merchant.slug}/catalog`, emoji: '🛍️' },
              { label: 'Storefront',href: `/store/${merchant.slug}`,         emoji: '🏪' },
              { label: 'WhatsApp',  href: `https://wa.me/${merchant.whatsapp}`, emoji: '💬', external: true },
              { label: 'Admin',     href: '/admin',                           emoji: '⚙️' },
            ].map(({ label, href, emoji, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-1.5
                           bg-white rounded-xl p-3
                           border border-gray-100 shadow-card
                           hover:shadow-card-hover transition-shadow"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-2xs text-gray-600 font-medium text-center leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Inquiries — empty state for Phase 1 ── */}
        <section className="px-3 mt-5 pb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Recent Inquiries
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card
                          p-8 text-center">
            <MessageCircle size={40} className="mx-auto mb-3 text-gray-200" />
            <p className="text-sm font-semibold text-gray-500 mb-1">No inquiries yet</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              When customers tap your WhatsApp buttons,
              their inquiries will appear here.
            </p>
            <Link
              href={`/store/${merchant.slug}`}
              className="inline-flex items-center gap-1.5 mt-4
                         text-xs font-semibold text-merchant-primary"
            >
              View Storefront →
            </Link>
          </div>

          {/* Phase note */}
          <p className="text-center text-xs text-gray-300 mt-4">
            Phase 2: real-time inquiry tracking via API + WebSocket
          </p>
        </section>

      </div>
    </>
  )
}
