'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3X3, MessageCircle, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Merchant } from '@/types/merchant'

interface BottomNavProps {
  merchant:     Merchant
  inquiryCount?: number
}

export function BottomNav({ merchant, inquiryCount = 0 }: BottomNavProps) {
  const pathname = usePathname()

  const items = [
    {
      href:    `/store/${merchant.slug}`,
      icon:    Home,
      label:   'Home',
      match:   (p: string) => p === `/store/${merchant.slug}`,
    },
    {
      href:    `/store/${merchant.slug}/catalog`,
      icon:    Grid3X3,
      label:   'Products',
      match:   (p: string) => p.includes('/catalog'),
    },
    {
      href:    `https://wa.me/${merchant.whatsapp}`,
      icon:    MessageCircle,
      label:   'WhatsApp',
      match:   () => false,
      external: true,
      accent:   true,
    },
    {
      href:    '/dashboard',
      icon:    LayoutDashboard,
      label:   'Dashboard',
      match:   (p: string) => p.startsWith('/dashboard'),
      badge:   inquiryCount > 0 ? inquiryCount : undefined,
    },
  ]

  return (
    <>
      {/* Spacer to prevent content hiding behind nav */}
      <div className="h-20 pb-safe" />

      {/* Fixed nav */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40
                   w-full max-w-mobile
                   bg-white/97 backdrop-blur-md
                   border-t border-merchant-border
                   flex items-center justify-around
                   px-2 pt-2 pb-safe"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        {items.map(({ href, icon: Icon, label, match, external, accent, badge }) => {
          const isActive = match(pathname)

          const content = (
            <span className={cn(
              'flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer',
              'transition-colors select-none',
              isActive ? 'text-merchant-primary' : 'text-gray-400'
            )}>
              <span className="relative">
                <Icon
                  size={22}
                  className={cn(
                    accent && 'text-whatsapp',
                    isActive && !accent && 'text-merchant-primary'
                  )}
                />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-1.5 -right-2
                                   bg-red-500 text-white text-2xs font-bold
                                   min-w-[16px] h-4 px-1 rounded-full
                                   flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </span>
              <span className={cn(
                'text-2xs font-medium',
                accent && 'text-whatsapp',
                isActive && !accent && 'text-merchant-primary'
              )}>
                {label}
              </span>
            </span>
          )

          return external ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex justify-center"
            >
              {content}
            </a>
          ) : (
            <Link key={label} href={href} className="flex-1 flex justify-center">
              {content}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
