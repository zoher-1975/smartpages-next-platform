import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Users, Store, BarChart2, Settings, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title:       'Platform Admin',
  description: 'Smart Pages platform administration',
  robots:      { index: false, follow: false },
}

export default function AdminPage() {
  const modules = [
    {
      icon:     Users,
      label:    'Merchants',
      desc:     'Onboard, configure and suspend merchant accounts',
      href:     '/admin/merchants',
      ready:    false,
    },
    {
      icon:     Store,
      label:    'Storefronts',
      desc:     'Preview and manage active storefronts',
      href:     '/admin/storefronts',
      ready:    false,
    },
    {
      icon:     BarChart2,
      label:    'Analytics',
      desc:     'Platform-wide WhatsApp tap and inquiry stats',
      href:     '/admin/analytics',
      ready:    false,
    },
    {
      icon:     Settings,
      label:    'Platform Settings',
      desc:     'Domain config, billing, and feature flags',
      href:     '/admin/settings',
      ready:    false,
    },
  ]

  return (
    <div className="page-container bg-gray-950 min-h-screen text-white px-4 py-12">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <ShieldCheck size={20} className="text-white/80" />
        </div>
        <div>
          <h1 className="text-lg font-black" style={{ fontFamily: 'var(--font-league-spartan)' }}>
            Platform Admin
          </h1>
          <p className="text-xs text-gray-400">Smart Pages LTD</p>
        </div>
      </div>

      {/* Phase 1 note */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
        <div className="flex gap-2 items-start">
          <Lock size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-300 leading-relaxed">
            <strong>Phase 1:</strong> Admin module is scaffolded but not yet active.
            Authentication, merchant management, and platform analytics arrive in Phase 2.
          </p>
        </div>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 gap-3">
        {modules.map(({ icon: Icon, label, desc, href, ready }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-xl p-4
                       flex items-center gap-4 opacity-60"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10
                            flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white/80">{label}</p>
              <p className="text-xs text-white/40 leading-snug mt-0.5">{desc}</p>
            </div>
            <span className="text-2xs text-white/30 border border-white/10
                             px-2 py-0.5 rounded-full flex-shrink-0">
              Phase 2
            </span>
          </div>
        ))}
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="flex items-center gap-2 mt-8
                   text-sm text-gray-500 hover:text-gray-300 transition-colors"
      >
        ← Back to Platform Home
      </Link>
    </div>
  )
}
