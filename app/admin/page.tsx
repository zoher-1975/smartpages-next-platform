import type { Metadata } from 'next'
import Link from 'next/link'
import { PLATFORM_STATS, PLATFORM_MERCHANTS } from '@/lib/demo-data'

export const metadata: Metadata = {
  title:  'Platform Admin · Smart Pages',
  robots: { index: false, follow: false },
}

const M_STATUS: Record<string, { dot: string; badge: string; label: string }> = {
  active:    { dot:'bg-green-400', badge:'bg-green-900/30 text-green-400',  label:'Active'    },
  pending:   { dot:'bg-amber-400', badge:'bg-amber-900/30 text-amber-400',  label:'Pending'   },
  suspended: { dot:'bg-red-400',   badge:'bg-red-900/30   text-red-400',    label:'Suspended' },
}

export default function AdminPage() {
  const s   = PLATFORM_STATS
  const ms  = PLATFORM_MERCHANTS

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── Dark sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0
                        bg-gray-900 border-r border-white/5 min-h-screen
                        fixed top-0 left-0 z-40">
        <div className="px-5 py-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
              <span className="text-white font-black text-xs">SP</span>
            </div>
            <span className="font-bold text-white text-sm">Smart Pages</span>
          </Link>
          <p className="text-2xs text-gray-500 mt-1 font-medium">Platform Admin</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {[
            { l:'Overview',     h:'/admin',      i:'📊', active: true  },
            { l:'Merchants',    h:'/admin',      i:'🏪' },
            { l:'Stores',       h:'/admin',      i:'🛍️' },
            { l:'Analytics',    h:'/admin',      i:'📈' },
            { l:'Campaigns',    h:'/admin',      i:'📣' },
            { l:'Settings',     h:'/admin',      i:'⚙️' },
            { l:'Merchant View',h:'/dashboard',  i:'👤' },
          ].map(({ l, h, i, active }) => (
            <Link key={l} href={h}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                              font-medium transition-all ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                  }`}>
              <span className="text-base">{i}</span>
              <span>{l}</span>
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/5">
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">
            ← Back to Platform
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 md:ml-56 min-w-0">

        {/* Top bar */}
        <div className="bg-gray-900 border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="md:hidden text-sm text-gray-500 mr-1">←</Link>
              <div>
                <p className="text-2xs text-gray-500 font-medium uppercase tracking-wide">Platform</p>
                <p className="text-sm font-bold text-white">Smart Pages Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-400 font-semibold">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl">

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-xl font-black text-white">Platform Overview</h1>
            <p className="text-sm text-gray-500 mt-0.5">Real-time platform health and merchant activity.</p>
          </div>

          {/* System health */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { l:'API Status',       v:'Operational', ok:true  },
              { l:'WhatsApp Engine',  v:'Phase 2',     ok:false, warn:true },
              { l:'Vercel Deploy',    v:'Active',      ok:true  },
            ].map(({ l, v, ok, warn }) => (
              <div key={l} className="bg-gray-900 border border-white/5 rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  ok ? 'bg-green-400' : warn ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <div>
                  <p className="text-2xs text-gray-500">{l}</p>
                  <p className={`text-xs font-bold ${
                    ok ? 'text-green-400' : warn ? 'text-amber-400' : 'text-red-400'
                  }`}>{v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { i:'🏪', l:'Total Merchants',  v:s.totalMerchants,  sub:`+${s.newThisMonth} this month`, up:true  },
              { i:'✅', l:'Active Stores',    v:s.activeStores,    sub:`${s.totalMerchants - s.activeStores} inactive` },
              { i:'💬', l:'Total WA Clicks',  v:s.totalWaClicks,   sub:'Platform-wide',  up:true },
              { i:'👁️', l:'Store Views',      v:s.totalStoreViews, sub:'All merchants',  up:true },
            ].map(({ i, l, v, sub, up }) => (
              <div key={l} className="bg-gray-900 border border-white/5 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{i}</span>
                  {sub && (
                    <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                      up ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'
                    }`}>{sub}</span>
                  )}
                </div>
                <p className="text-2xl font-black text-white leading-none mb-1">
                  {typeof v === 'number' ? v.toLocaleString() : v}
                </p>
                <p className="text-xs text-gray-500 font-medium">{l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { i:'📩', l:'Total Inquiries',    v:s.totalInquiries   },
              { i:'📊', l:'Avg Conversion',     v:s.avgConversion    },
              { i:'🆕', l:'New This Month',     v:s.newThisMonth     },
              { i:'⚠️', l:'Churned This Month', v:s.churnedThisMonth },
            ].map(({ i, l, v }) => (
              <div key={l} className="bg-gray-900 border border-white/5 rounded-2xl p-4">
                <span className="text-2xl block mb-3">{i}</span>
                <p className="text-2xl font-black text-white leading-none mb-1">
                  {typeof v === 'number' ? v.toLocaleString() : v}
                </p>
                <p className="text-xs text-gray-500 font-medium">{l}</p>
              </div>
            ))}
          </div>

          {/* Merchant roster */}
          <div className="bg-gray-900 border border-white/5 rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="text-sm font-bold text-white">Merchant Roster</h2>
              <span className="text-2xs text-gray-500 font-medium">{ms.length} registered</span>
            </div>

            {/* Header row */}
            <div className="hidden md:grid px-5 py-2.5 border-b border-white/5
                            grid-cols-[1fr_120px_100px_80px_80px_80px]
                            text-2xs text-gray-500 font-bold uppercase tracking-wide">
              <span>Merchant</span>
              <span>Category</span>
              <span>Status</span>
              <span className="text-right">Views</span>
              <span className="text-right">WA</span>
              <span className="text-right">Joined</span>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {ms.map(m => {
                const st = M_STATUS[m.status] ?? M_STATUS.active
                return (
                  <div key={m.id}
                       className="flex md:grid md:grid-cols-[1fr_120px_100px_80px_80px_80px]
                                  items-center gap-3 px-5 py-3.5
                                  hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.location}</p>
                    </div>
                    <span className="hidden md:block text-xs text-gray-500 truncate">{m.category}</span>
                    <span className={`flex items-center gap-1.5 w-fit text-xs font-bold
                                      px-2.5 py-1 rounded-full ${st.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                      {st.label}
                    </span>
                    <span className="hidden md:block text-xs text-gray-400 text-right">
                      {m.storeViews.toLocaleString()}
                    </span>
                    <span className="hidden md:block text-xs text-[#25D366] font-bold text-right">
                      {m.waClicks.toLocaleString()}
                    </span>
                    <span className="hidden md:block text-xs text-gray-600 text-right">
                      {m.joinedDate}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phase 2 roadmap */}
          <div className="bg-gray-900 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-sm font-bold text-amber-400 mb-3">🔧 Phase 2 Roadmap</p>
            <div className="grid md:grid-cols-2 gap-y-2 gap-x-8">
              {[
                'Real-time WhatsApp Engine integration',
                'Merchant authentication & onboarding flow',
                'Campaign management & analytics engine',
                'Subscription billing & plan management',
                'Multi-language support (Arabic RTL / English)',
                'Advanced platform analytics & reporting',
              ].map(item => (
                <p key={item} className="flex items-start gap-2 text-xs text-gray-400">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">→</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
