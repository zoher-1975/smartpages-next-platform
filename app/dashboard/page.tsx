import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DEMO_MERCHANT, DASHBOARD_STATS, DEMO_INQUIRIES,
  DEMO_CAMPAIGNS, WEEKLY_VIEWS, WEEKLY_WA, WEEK_LABELS,
} from '@/lib/demo-data'
import { DashboardCampaigns } from '@/components/dashboard/DashboardCampaigns'

export const metadata: Metadata = {
  title:  'Merchant Dashboard · Smart Pages',
  robots: { index: false, follow: false },
}

const INQ_STATUS: Record<string, { bg: string; text: string; label: string }> = {
  new:       { bg:'bg-blue-50',   text:'text-blue-700',  label:'New'       },
  replied:   { bg:'bg-amber-50',  text:'text-amber-700', label:'Replied'   },
  confirmed: { bg:'bg-green-50',  text:'text-green-700', label:'Confirmed' },
  closed:    { bg:'bg-gray-100',  text:'text-gray-500',  label:'Closed'    },
}




const maxView = Math.max(...WEEKLY_VIEWS)
const maxWA   = Math.max(...WEEKLY_WA)

function StatCard({ icon, label, value, sub, subGreen }: {
  icon: string; label: string; value: string | number; sub?: string; subGreen?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {sub && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            subGreen ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
          }`}>
            {sub}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-gray-900 leading-none mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </div>
  )
}

export default function DashboardPage() {
  const m     = DEMO_MERCHANT
  const s     = DASHBOARD_STATS
  const newCt = DEMO_INQUIRIES.filter(i => i.status === 'new').length

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0
                        bg-white border-r border-gray-100 min-h-screen
                        fixed top-0 left-0 z-40">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
              <span className="text-white font-black text-xs">SP</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">Smart Pages</span>
          </Link>
          <p className="text-2xs text-gray-400 mt-1 font-medium">Merchant Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {[
            { l:'Overview',   h:'/dashboard',        i:'📊', badge: newCt || 0 },
            { l:'Store',      h:'/store/demo',        i:'🏪' },
            { l:'Products',   h:'/store/demo',        i:'🛍️' },
            { l:'Inquiries',  h:'/dashboard',        i:'💬', badge: newCt || 0 },
            { l:'Campaigns',  h:'/dashboard',        i:'📣' },
            { l:'Analytics',  h:'/dashboard',        i:'📈' },
            { l:'Admin Panel',h:'/admin',            i:'⚙️' },
          ].map(({ l, h, i, badge }) => (
            <Link key={l} href={h}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                              font-medium transition-all ${
                    l === 'Overview'
                      ? 'bg-[#25D366]/8 text-[#25D366]'
                      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                  }`}>
              <span className="text-base">{i}</span>
              <span className="flex-1">{l}</span>
              {badge && badge > 0 && (
                <span className="bg-red-500 text-white text-2xs font-bold
                                 min-w-[17px] h-[17px] rounded-full
                                 flex items-center justify-center px-1">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
            ← Back to Platform
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 md:ml-56 min-w-0">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="md:hidden text-sm text-gray-400 mr-1">←</Link>
              <div>
                <p className="text-2xs text-gray-400 font-medium uppercase tracking-wide">Dashboard</p>
                <p className="text-sm font-bold text-gray-900">{m.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              {newCt > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold
                                 px-2.5 py-0.5 rounded-full animate-pulse">
                  {newCt} new
                </span>
              )}
              <Link href="/store/demo"
                    className="text-xs bg-[#25D366] text-white font-bold
                               px-3.5 py-1.5 rounded-xl hover:bg-[#1da851] transition-colors
                               shadow-wa-sm">
                View Store →
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl">

          {/* Welcome row */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">Good morning 👋</h1>
              <p className="text-sm text-gray-400 mt-0.5">Here is your store performance today.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200
                            rounded-2xl px-4 py-2.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-green-700">Store online</span>
            </div>
          </div>

          {/* Stats — row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <StatCard icon="👁️" label="Store Views"   value={s.storeViews}    sub="+21% week" subGreen />
            <StatCard icon="💬" label="WA Clicks"     value={s.waClicks}      sub="+15% week" subGreen />
            <StatCard icon="📩" label="Inquiries"     value={s.inquiries}     sub={newCt > 0 ? `${newCt} unread` : 'All read'} subGreen={newCt > 0} />
            <StatCard icon="📈" label="Conversion"    value={s.conversionRate} />
          </div>
          {/* Stats — row 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard icon="🛍️" label="Products"      value={s.productsCount}  />
            <StatCard icon="📣" label="Campaigns"     value={s.campaignsCount} />
            <StatCard icon="⚡" label="Avg Response"  value={s.avgResponseTime} />
            <StatCard icon="📅" label="This Week"     value={s.thisWeekViews}  sub="+21% vs last" subGreen />
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Views */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-bold text-gray-900">Store Views</p>
                  <p className="text-2xs text-gray-400 mt-0.5">This week</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+21%</span>
              </div>
              <div className="flex items-end gap-1.5 h-28">
                {WEEKLY_VIEWS.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-t-lg transition-all"
                         style={{ height:`${Math.round((v/maxView)*96)}px`,
                                  background: i===6 ? '#7B3F00' : '#F3EDE4' }} />
                    <span className="text-2xs text-gray-400">{WEEK_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* WA clicks */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-bold text-gray-900">WhatsApp Clicks</p>
                  <p className="text-2xs text-gray-400 mt-0.5">This week</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+15%</span>
              </div>
              <div className="flex items-end gap-1.5 h-28">
                {WEEKLY_WA.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-t-lg transition-all"
                         style={{ height:`${Math.round((v/maxWA)*96)}px`,
                                  background: i===6 ? '#25D366' : '#DCFCE7' }} />
                    <span className="text-2xs text-gray-400">{WEEK_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiries */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card mb-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Recent Inquiries</h2>
              <span className="text-2xs text-gray-400 font-medium">{DEMO_INQUIRIES.length} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {DEMO_INQUIRIES.map(inq => {
                const s = INQ_STATUS[inq.status] ?? INQ_STATUS.new
                return (
                  <div key={inq.id}
                       className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                      💬
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{inq.product}</p>
                      <p className="text-xs text-gray-400 truncate">{inq.id} · {inq.customer} · {inq.time}</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-sm font-bold text-gray-900">{inq.amount}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Campaigns — with Share/Publish modal */}
          <DashboardCampaigns merchant={m} campaigns={DEMO_CAMPAIGNS} />

          {/* ── Merchant Social Settings ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card mb-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Social & Contact Settings</h2>
              <span className="text-xs text-gray-400">Phase 2: editable</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { label:'WhatsApp',  value: m.social.whatsapp,  icon:'💬', href:`https://wa.me/${m.social.whatsapp}` },
                { label:'Instagram', value: m.social.instagram, icon:'📸', href: m.social.instagram  },
                { label:'Facebook',  value: m.social.facebook,  icon:'👥', href: m.social.facebook   },
                { label:'Telegram',  value: m.social.telegram,  icon:'✈️', href: m.social.telegram   },
                { label:'TikTok',    value: m.social.tiktok,    icon:'🎵', href: m.social.tiktok     },
                { label:'Website',   value: m.social.website,   icon:'🌐', href: m.social.website    },
              ].filter(r => r.value).map(({ label, value, icon, href }) => (
                <div key={label} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base flex-shrink-0">{icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-500">{label}</p>
                      <p className="text-xs text-gray-700 truncate font-mono">{value}</p>
                    </div>
                  </div>
                  {href && (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                       className="text-xs text-[#25D366] font-semibold flex-shrink-0 ml-3 hover:underline">
                      Open →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700 leading-relaxed">
            <strong className="font-bold">Phase 1 — Static demo data.</strong>{' '}
            Phase 2 will connect this dashboard to the WhatsApp Engine for real-time inquiry tracking,
            campaign analytics, and live store metrics.
          </div>
        </div>
      </main>
    </div>
  )
}
