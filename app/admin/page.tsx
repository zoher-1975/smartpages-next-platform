import type { Metadata } from 'next'
import Link from 'next/link'
import { PLATFORM_STATS, PLATFORM_MERCHANTS } from '@/lib/demo-data'
import { StatsCard } from '@/components/ui/StatsCard'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export const metadata: Metadata = {
  title:  'Platform Admin — Smart Pages',
  robots: { index: false, follow: false },
}

const STATUS_STYLES = {
  active:    { dot: 'bg-green-400',  badge: 'bg-green-900/30 text-green-400'  },
  pending:   { dot: 'bg-amber-400',  badge: 'bg-amber-900/30 text-amber-400'  },
  suspended: { dot: 'bg-red-400',    badge: 'bg-red-900/30 text-red-400'      },
}

const NAV_ITEMS = [
  { label: 'Overview',   href: '/admin', icon: '📊' },
  { label: 'Merchants',  href: '/admin', icon: '🏪' },
  { label: 'Stores',     href: '/admin', icon: '🛍️' },
  { label: 'Analytics',  href: '/admin', icon: '📈' },
  { label: 'Campaigns',  href: '/admin', icon: '📣' },
  { label: 'Settings',   href: '/admin', icon: '⚙️' },
  { label: 'Merchant View', href: '/dashboard', icon: '👤' },
]

export default function AdminPage() {
  const stats     = PLATFORM_STATS
  const merchants = PLATFORM_MERCHANTS

  return (
    <div className="flex min-h-screen bg-gray-950">

      {/* Dark sidebar for admin — visually distinct from merchant dashboard */}
      <DashboardSidebar
        title="Platform Admin"
        items={NAV_ITEMS}
        active="Overview"
        variant="admin"
      />

      {/* Main content */}
      <main className="flex-1 md:ml-56">

        {/* ── Top bar ── */}
        <div className="bg-gray-900 border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="md:hidden text-sm text-gray-500 mr-1">←</Link>
              <div>
                <p className="text-xs text-gray-500">Platform Administration</p>
                <p className="text-sm font-bold text-white">Smart Pages Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl">

          {/* ── Page title ── */}
          <div className="mb-6">
            <h1 className="text-xl font-black text-white mb-1">Platform Overview</h1>
            <p className="text-sm text-gray-500">
              Real-time platform health and merchant activity
            </p>
          </div>

          {/* ── Platform health bar ── */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'API Status',      status: 'Operational', ok: true },
              { label: 'WhatsApp Engine', status: 'Phase 2',     ok: false, note: true },
              { label: 'Vercel Deploy',   status: 'Active',      ok: true },
            ].map(({ label, status, ok, note }) => (
              <div key={label}
                   className="bg-gray-900 border border-white/5 rounded-xl px-4 py-3
                              flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  ok ? 'bg-green-400' : note ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={`text-xs font-bold ${
                    ok ? 'text-green-400' : note ? 'text-amber-400' : 'text-red-400'
                  }`}>{status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {/* Override card bg for dark theme via inline style */}
            {[
              { label: 'Total Merchants',  value: stats.totalMerchants,  icon: '🏪', sub: `+${stats.newThisMonth} this month`, subUp: true  },
              { label: 'Active Stores',    value: stats.activeStores,    icon: '✅', sub: `${stats.totalMerchants - stats.activeStores} inactive` },
              { label: 'Total WA Clicks',  value: stats.totalWaClicks,   icon: '💬', sub: 'Platform-wide',  subUp: true },
              { label: 'Store Views',      value: stats.totalStoreViews, icon: '👁️', sub: 'All merchants',  subUp: true },
            ].map(s => (
              <div key={s.label}
                   className="bg-gray-900 border border-white/5 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  {s.sub && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      s.subUp ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'
                    }`}>{s.sub}</span>
                  )}
                </div>
                <p className="text-2xl font-black text-white leading-none mb-1">
                  {typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Second stats row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Total Inquiries',   value: stats.totalInquiries,  icon: '📩' },
              { label: 'Avg Conversion',    value: stats.avgConversion,   icon: '📊' },
              { label: 'Churned This Month', value: stats.churnedThisMonth, icon: '⚠️' },
            ].map(s => (
              <div key={s.label}
                   className="bg-gray-900 border border-white/5 rounded-2xl p-4">
                <span className="text-2xl block mb-3">{s.icon}</span>
                <p className="text-2xl font-black text-white leading-none mb-1">
                  {typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Merchant list ── */}
          <div className="bg-gray-900 border border-white/5 rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="text-sm font-bold text-white">Merchant Roster</h2>
              <span className="text-xs text-gray-500">
                {PLATFORM_MERCHANTS.length} registered
              </span>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-3 px-5 py-2 border-b border-white/5">
              {['Merchant', 'Category', 'Status', 'Views', 'WA Clicks', 'Joined'].map(h => (
                <div key={h} className={`text-2xs text-gray-500 font-bold uppercase tracking-wide
                                         ${h === 'Merchant' ? 'col-span-3' :
                                           h === 'Category' ? 'col-span-2' : 'col-span-1'}`}>
                  {h === 'Merchant' || h === 'Category' ? h : null}
                </div>
              ))}
            </div>

            <div className="divide-y divide-white/5">
              {merchants.map(m => {
                const style = STATUS_STYLES[m.status]
                return (
                  <div key={m.id}
                       className="flex items-center gap-3 px-5 py-3.5
                                  hover:bg-white/3 transition-colors">
                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.location}</p>
                    </div>

                    {/* Category */}
                    <span className="hidden md:block text-xs text-gray-400 w-24 flex-shrink-0">
                      {m.category}
                    </span>

                    {/* Status */}
                    <span className={`flex items-center gap-1.5 text-xs font-bold
                                      px-2.5 py-1 rounded-full flex-shrink-0 ${style.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {m.status}
                    </span>

                    {/* Views */}
                    <span className="text-xs text-gray-400 w-16 text-right flex-shrink-0">
                      {m.storeViews.toLocaleString()}
                    </span>

                    {/* WA Clicks */}
                    <span className="text-xs text-[#25D366] font-bold w-16 text-right flex-shrink-0">
                      {m.waClicks.toLocaleString()}
                    </span>

                    {/* Joined */}
                    <span className="hidden md:block text-xs text-gray-600 w-20 text-right flex-shrink-0">
                      {m.joinedDate}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phase 2 roadmap callout */}
          <div className="bg-gray-900 border border-amber-500/20 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-amber-400 mb-2">🔧 Phase 2 Roadmap</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'Real-time WhatsApp Engine integration',
                'Merchant authentication & onboarding',
                'Campaign management & analytics',
                'Subscription billing & plan management',
                'Multi-language support (Arabic / English)',
                'Advanced platform analytics dashboard',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-amber-500">→</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
