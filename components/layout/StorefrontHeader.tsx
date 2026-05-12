'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, MessageCircle, X, Home, Grid3X3, LayoutDashboard, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Merchant } from '@/types/merchant'

interface StorefrontHeaderProps {
  merchant: Merchant
  title?:   string
  back?:    string   // URL for back button; if undefined, shows menu instead
}

export function StorefrontHeader({ merchant, title, back }: StorefrontHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuLinks = [
    { href: `/store/${merchant.slug}`,          icon: Home,          label: 'Storefront Home' },
    { href: `/store/${merchant.slug}/catalog`,  icon: Grid3X3,       label: 'Products' },
    { href: '/dashboard',                       icon: LayoutDashboard, label: 'Merchant Dashboard' },
    { href: '/merchant/sign-in',                icon: LogIn,           label: 'Merchant Sign In' },
  ]

  return (
    <>
      {/* ── Top Bar ── */}
      <header
        className="fixed top-0 left-1/2 -translate-x-1/2 z-40
                   w-full max-w-mobile
                   bg-white/95 backdrop-blur-md
                   border-b border-merchant-border"
      >
        <div className="flex items-center h-14 px-4 gap-3">

          {/* Left: back or menu */}
          {back ? (
            <Link href={back}
                  className="w-9 h-9 flex items-center justify-center
                             rounded-full hover:bg-merchant-surface transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center
                         rounded-full hover:bg-merchant-surface transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Centre: title */}
          <span className="flex-1 text-center text-sm font-semibold text-merchant-text truncate"
                style={{ fontFamily: 'var(--font-league-spartan)' }}>
            {title ?? merchant.name}
          </span>

          {/* Right: WhatsApp quick contact */}
          <a
            href={`https://wa.me/${merchant.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center
                       rounded-full hover:bg-whatsapp/10 transition-colors"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle size={20} className="text-whatsapp" />
          </a>
        </div>
      </header>

      {/* ── Spacer ── */}
      <div className="h-14" />

      {/* ── Off-canvas menu ── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <nav
            className="fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw]
                       bg-white shadow-2xl animate-slide-up
                       flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4
                            border-b border-merchant-border">
              <span className="font-bold text-merchant-text"
                    style={{ fontFamily: 'var(--font-league-spartan)' }}>
                {merchant.name}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full
                           hover:bg-merchant-surface"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="flex-1 py-2">
              {menuLinks.map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5
                               text-sm text-merchant-text hover:bg-merchant-surface
                               transition-colors"
                  >
                    <Icon size={18} className="text-merchant-muted" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-5 py-4 border-t border-merchant-border">
              <p className="text-2xs text-merchant-muted">
                Powered by Smart Pages LTD
              </p>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
