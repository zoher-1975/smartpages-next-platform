import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn, formatPrice, formatDiscount } from '@/lib/utils'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import type { Product, Merchant } from '@/types/merchant'

interface ProductCardProps {
  product:  Product
  merchant: Merchant
  view?:    'grid' | 'list'
  className?: string
}

export function ProductCard({ product, merchant, view = 'grid', className }: ProductCardProps) {
  const sym       = merchant.currencySymbol
  const hasSale   = product.origPrice !== null && product.origPrice > product.price
  const slug      = merchant.slug
  const href      = `/store/${slug}/product/${product.id}`

  if (view === 'list') {
    return (
      <Link
        href={href}
        className={cn(
          'flex gap-3 bg-white rounded-xl border border-merchant-border',
          'shadow-card hover:shadow-card-hover transition-shadow p-3',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-merchant-surface">
          <Image
            src={product.thumbnail}
            alt={product.shortName}
            fill
            className="object-cover"
            sizes="96px"
          />
          {hasSale && (
            <span className="absolute top-1 left-1 bg-red-500 text-white
                             text-2xs font-bold px-1.5 py-0.5 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <p className="text-sm font-medium text-merchant-text line-clamp-2 leading-snug">
              {product.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-merchant-muted">{product.rating}</span>
              <span className="text-xs text-merchant-muted">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-merchant-primary"
                    style={{ fontFamily: 'var(--font-league-spartan)' }}>
                {formatPrice(product.price, sym)}
              </span>
              {hasSale && (
                <span className="text-xs text-merchant-muted line-through">
                  {formatPrice(product.origPrice!, sym)}
                </span>
              )}
            </div>
            <WhatsAppCTA merchant={merchant} product={product} variant="icon" />
          </div>
        </div>
      </Link>
    )
  }

  // ── Grid view (default) ────────────────────────────────────────────────────
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col bg-white rounded-xl border border-merchant-border overflow-hidden',
        'shadow-card hover:shadow-card-hover transition-shadow',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-merchant-surface overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.shortName}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 480px) 50vw, 240px"
        />

        {/* Sale badge */}
        {hasSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white
                           text-2xs font-bold px-1.5 py-0.5 rounded z-10">
            {formatDiscount(product.origPrice!, product.price)}
          </span>
        )}

        {/* WhatsApp quick-inquiry button */}
        <div className="absolute bottom-2 right-2 z-10">
          <WhatsAppCTA merchant={merchant} product={product} variant="icon" />
        </div>
      </div>

      {/* Body */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <p className="text-xs font-medium text-merchant-text line-clamp-2 leading-snug">
          {product.shortName}
        </p>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-merchant-primary"
                  style={{ fontFamily: 'var(--font-league-spartan)' }}>
              {formatPrice(product.price, sym)}
            </span>
            {hasSale && (
              <span className="text-2xs text-merchant-muted line-through">
                {formatPrice(product.origPrice!, sym)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-0.5">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-2xs text-merchant-muted">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
