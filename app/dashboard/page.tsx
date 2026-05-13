import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DEMO_MERCHANT, DASHBOARD_STATS, DEMO_INQUIRIES,
  DEMO_CAMPAIGNS, WEEKLY_VIEWS, WEEKLY_WA, WEEK_LABELS
} from '@/lib/demo-data'
import { StatsCard } from '@/components/ui/StatsCard'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export const metadata: Metadata = {
  title:  'Merchant Dashboard — Smart Pages',
  robots: { index: false, follow: false },
}

const STATUS_STYLES = {
  new:       'bg-blue-50 text-blue-700',
  replied:   'bg-amber-50 text-amber-700',
  confirmed: 'bg-green-50 text-green-700',
  closed:    'bg-gray-100 text-gray-500',
}

const CAMPAIGN_STYLES = {
  active:    'bg-green-100 text-green-700',
  scheduled: 'bg-blue-100 text-blue-700',
  ended:     'bg-gray-100 text-gray-500',
}

const NAV_ITEMS = [
  { label: 'Overview',   href: '/dashboard',          icon: '📊', badge: 2 },
  { label: 'Products',   href: '/store/demo',         icon: '🛍️' },
  { label: 'Inquiries',  href: '/dashboard',          icon: '💬', badge: 2 },
  { label: 'Campaigns',  href: '/dashboard',          icon: '📣' },
  { label: 'Analytics',  href: '/dashboard',          icon: '📈' },
  { label: 'Store',      href: '/store/demo',         icon: '🏪' },
  { label: 'Admin Panel', href: '/admin',             icon: '⚙️' },
]

const maxView = Math.max(...WEEKLY_VIEWS)
const maxWA   = Math.max(...WEEKLY_WA)

export default function DashboardPage() {
  const merchant = DEMO_MERCHANT
  const stats    = DASHBOARD_STATS
  const newInq   = DEMO_INQUIRIES.filter(i => i.status === 'new').length

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar (desktop) */}
      <DashboardSidebar title="Merchant Dashboard" items={NAV_ITEMS} active="Overview" />

      {/* Main content */}
      <main className="flex-1 md:ml-56">

        {/* ── Top bar ── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile: back link */}
              <Link href="/" className="md:hidden text-sm text-gray-500 mr-1">←</Link>
              <div>
                <p className="text-xs text-gray-400">Merchant Dashboard</p>
                <p className="text-sm font-bold text-gray-900">{merchant.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {newInq > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold
                                 px-2 py-0.5 rounded-full">
                  {newInq} new
                </span>
              )}
              <Link href="/store/demo"
                    className="text-xs bg-gray-100 text-gray-700 font-medium
                               px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                View Store →
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl">

          {/* ── Welcome + store status ── */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">Good morning 👋</h1>
              <p className="text-sm text-gray-500">Here is your store performance today.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200
                            rounded-xl px-4 py-2.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Store is online</span>
            </div>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatsCard label="Store Views"   value={stats.storeViews}    icon="👁️"  iconBg="bg-blue-50"   sub="+21% this week" subUp />
            <StatsCard label="WA Clicks"     value={stats.waClicks}      icon="💬"  iconBg="bg-green-50"  sub="+15% this week" subUp />
            <StatsCard label="Inquiries"     value={stats.inquiries}     icon="📩"  iconBg="bg-amber-50"  sub={`${newInq} unread`} subUp />
            <StatsCard label="Conversion"    value={stats.conversionRate} icon="📈" iconBg="bg-purple-50" sub="30.8% rate" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatsCard label="Products"      value={stats.productsCount}  icon="🛍️"  iconBg="bg-orange-50" />
            <StatsCard label="Campaigns"     value={stats.campaignsCount} icon="📣"  iconBg="bg-pink-50" />
            <StatsCard label="Avg Response"  value={stats.avgResponseTime} icon="⚡" iconBg="bg-yellow-50" />
            <StatsCard label="This Week Views" value={stats.thisWeekViews} icon="📅" iconBg="bg-teal-50" sub="+21% vs last" subUp />
          </div>

          {/* ── Charts row ── */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">

            {/* Store views chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Store Views — This Week</h2>
                <span className="text-xs text-green-600 font-semibold">+21%</span>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {WEEKLY_VIEWS.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${Math.round((v / maxView) * 80)}px`,
                        background: i === 6 ? '#7B3F00' : '#F3EDE4',
                      }}
                    />
                    <span className="text-2xs text-gray-400">{WEEK_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WA clicks chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">WhatsApp Clicks — This Week</h2>
                <span className="text-xs text-green-600 font-semibold">+15%</span>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {WEEKLY_WA.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${Math.round((v / maxWA) * 80)}px`,
                        background: i === 6 ? '#25D366' : '#DCFCE7',
                      }}
                    />
                    <span className="text-2xs text-gray-400">{WEEK_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Recent Inquiries ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Recent Inquiries</h2>
              <span className="text-xs text-gray-400">{DEMO_INQUIRIES.length} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {DEMO_INQUIRIES.map(inq => (
                <div key={inq.id} className="flex items-center gap-3 px-5 py-3.5
                                              hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center
                                  justify-center text-base flex-shrink-0">
                    💬
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{inq.product}</p>
                    <p className="text-xs text-gray-400">{inq.id} · {inq.customer} · {inq.time}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-900">{inq.amount}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize
                                      ${STATUS_STYLES[inq.status]}`}>
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Campaigns ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Campaigns</h2>
              <span className="text-xs bg-green-100 text-green-700 font-bold
                               px-2 py-0.5 rounded-full">1 active</span>
            </div>
            <div className="divide-y divide-gray-50">
              {DEMO_CAMPAIGNS.map(c => (
                <div key={c.id} className="px-5 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400">Ends {c.endDate}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize
                                      ${CAMPAIGN_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  {c.status !== 'scheduled' && (
                    <div className="flex gap-6 mt-2">
                      {[
                        { l: 'Reach',       v: c.reach.toLocaleString()       },
                        { l: 'Clicks',      v: c.clicks.toLocaleString()      },
                        { l: 'Conversions', v: c.conversions.toLocaleString() },
                      ].map(({ l, v }) => (
                        <div key={l}>
                          <p className="text-sm font-black text-gray-900">{v}</p>
                          <p className="text-2xs text-gray-400">{l}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700">
            <strong>Phase 1 — Static Demo Data.</strong> In Phase 2, this dashboard will connect to
            the WhatsApp Engine for real-time inquiry tracking, campaign analytics, and merchant management.
          </div>

        </div>
      </main>
    </div>
  )
}
