import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Merchant, MerchantStatus } from '@/types/merchant'

interface MerchantHeroProps {
  merchant: Merchant
  status:   MerchantStatus
}

export function MerchantHero({ merchant, status }: MerchantHeroProps) {
  return (
    <div
      className="relative px-4 pt-5 pb-10 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${merchant.colors.primary} 0%, color-mix(in srgb, ${merchant.colors.primary} 60%, #000) 100%)` }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 bg-white" />
      <div className="absolute -bottom-12 -right-4 w-28 h-28 rounded-full opacity-10 bg-white" />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full border-2 border-white/40 overflow-hidden
                        mb-3 bg-white/20">
          <Image
            src={merchant.logo}
            alt={`${merchant.name} logo`}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name & tagline */}
        <h1 className="text-2xl font-black text-white leading-tight mb-1"
            style={{ fontFamily: 'var(--font-league-spartan)' }}>
          {merchant.name}
        </h1>
        <p className="text-xs text-white/80 leading-relaxed mb-4">
          {merchant.tagline}
        </p>

        {/* Stats row */}
        <div className="flex gap-5">
          {[
            { value: merchant.stats.products,             label: 'Products' },
            { value: `${merchant.stats.rating} ★`,        label: 'Rating'   },
            { value: merchant.stats.reviews,               label: 'Reviews'  },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <span className="block text-lg font-bold text-white leading-none"
                    style={{ fontFamily: 'var(--font-league-spartan)' }}>
                {value}
              </span>
              <span className="block text-2xs text-white/60 uppercase tracking-wide mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-7 bg-white rounded-t-[20px]" />

      {/* Status chip overlaid on the curve */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10
                      flex items-center gap-1.5
                      bg-white rounded-full px-3 py-1
                      shadow-sm text-xs font-medium">
        <span className={cn(
          'w-2 h-2 rounded-full',
          status.online
            ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]'
            : 'bg-gray-300'
        )} />
        <span className={status.online ? 'text-green-700' : 'text-merchant-muted'}>
          {status.label}
        </span>
      </div>
    </div>
  )
}
