'use client'

import { buildWhatsAppUrl } from '@/lib/demo-data'

// ── WhatsApp SVG icon ──────────────────────────────────────────────────────────
export function WAIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
         className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

interface WhatsAppButtonProps {
  whatsapp:    string
  productName: string
  productId:   string
  price:       string
  variant?:    'full' | 'compact' | 'icon'
  className?:  string
}

export function WhatsAppButton({
  whatsapp, productName, productId, price,
  variant = 'full', className = '',
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(whatsapp, productName, productId, price)

  if (variant === 'icon') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        aria-label={`Inquire about ${productName} on WhatsApp`}
        className={`w-9 h-9 rounded-full bg-[#25D366] text-white
                    flex items-center justify-center flex-shrink-0
                    shadow-[0_3px_10px_rgba(37,211,102,0.38)]
                    hover:bg-[#1da851] hover:scale-110 active:scale-95
                    transition-all duration-150 ${className}`}
      >
        <WAIcon size={16} />
      </a>
    )
  }

  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2
                    bg-[#25D366] text-white font-semibold text-sm
                    px-4 py-2.5 rounded-xl
                    hover:bg-[#1da851] active:scale-95
                    transition-all duration-150
                    shadow-[0_3px_10px_rgba(37,211,102,0.3)] ${className}`}
      >
        <WAIcon size={15} />
        Enquire
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 w-full
                  bg-[#25D366] text-white font-bold text-base
                  py-4 px-6 rounded-2xl
                  hover:bg-[#1da851] active:scale-[0.98]
                  transition-all duration-150
                  shadow-[0_6px_20px_rgba(37,211,102,0.4)] ${className}`}
    >
      <WAIcon size={22} />
      <span>
        <span className="block leading-tight">Order via WhatsApp</span>
        <span className="block text-xs font-normal opacity-80 mt-0.5">
          Instant reply · Free consultation
        </span>
      </span>
    </a>
  )
}

// Generic store contact button (no product)
export function WhatsAppContact({
  whatsapp, label = 'Chat on WhatsApp', className = '',
}: { whatsapp: string; label?: string; className?: string }) {
  const msg = encodeURIComponent("Hello! 👋 I found your store and would like to know more.")
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-[#25D366] font-bold
                  hover:text-[#1da851] transition-colors ${className}`}
    >
      <WAIcon size={17} />
      {label}
    </a>
  )
}
