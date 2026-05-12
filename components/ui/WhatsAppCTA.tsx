'use client'

import { MessageCircle } from 'lucide-react'
import { cn, buildWhatsAppUrl, generateInquiryId } from '@/lib/utils'
import type { Product, Merchant } from '@/types/merchant'

// ── WhatsApp SVG icon (brand colour) ─────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-5 h-5', className)}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface WhatsAppCTAProps {
  merchant:       Merchant
  product?:       Product
  quantity?:      number
  selectedSize?:  string | null
  selectedColor?: string | null
  variant?:       'full' | 'compact' | 'icon'
  className?:     string
}

// ── Message builder (client-side only) ────────────────────────────────────────

function buildMessage({
  merchant,
  product,
  quantity = 1,
  selectedSize,
  selectedColor,
}: WhatsAppCTAProps): string {
  const sym    = merchant.currencySymbol
  const inqId  = generateInquiryId(product?.id)

  if (!product) {
    return [
      `Hello ${merchant.name}! 👋`,
      ``,
      `I found your store and would like to know more about your products.`,
      ``,
      `Ref: ${inqId}`,
    ].join('\n')
  }

  const price  = (product.price * quantity).toFixed(2)
  const lines  = [
    `Hello! 👋 I'm interested in ordering:`,
    ``,
    `*${product.name}*`,
    `Price: ${sym}${price}${quantity > 1 ? ` (${quantity} × ${sym}${product.price.toFixed(2)})` : ''}`,
  ]

  if (selectedSize)  lines.push(`Size: ${selectedSize}`)
  if (selectedColor) lines.push(`Colour: ${selectedColor}`)

  lines.push(``, `Ref: ${inqId}`)
  lines.push(``, `Please confirm availability and how to proceed. Thank you!`)

  return lines.join('\n')
}

// ── Component ──────────────────────────────────────────────────────────────────

export function WhatsAppCTA({
  merchant,
  product,
  quantity,
  selectedSize,
  selectedColor,
  variant = 'full',
  className,
}: WhatsAppCTAProps) {
  function handleClick() {
    const message = buildMessage({ merchant, product, quantity, selectedSize, selectedColor })
    const url     = buildWhatsAppUrl(merchant.whatsapp, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // ── Icon-only variant (used on product cards) ────────────────────────────
  if (variant === 'icon') {
    return (
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); handleClick() }}
        className={cn(
          'w-8 h-8 rounded-full bg-whatsapp flex items-center justify-center',
          'shadow-whatsapp text-white',
          'transition-transform active:scale-90 hover:scale-110',
          className
        )}
        aria-label="Quick WhatsApp inquiry"
      >
        <WhatsAppIcon className="w-4 h-4" />
      </button>
    )
  }

  // ── Compact variant (narrow spaces) ─────────────────────────────────────
  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={cn('btn-whatsapp py-3 text-sm', className)}
      >
        <WhatsAppIcon />
        <span>Enquire on WhatsApp</span>
      </button>
    )
  }

  // ── Full variant (product detail sticky bar) ─────────────────────────────
  return (
    <button
      onClick={handleClick}
      className={cn('btn-whatsapp', className)}
    >
      <WhatsAppIcon />
      <span className="flex-1 text-left">
        <span className="block font-bold text-base leading-tight">Enquire on WhatsApp</span>
        <span className="block text-xs opacity-80 font-normal mt-0.5">
          We reply fast
        </span>
      </span>
    </button>
  )
}
