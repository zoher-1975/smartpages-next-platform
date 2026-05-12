import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Merchant, MerchantStatus, WeekDay } from '@/types/merchant'

// ── Tailwind class merge helper ────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Currency formatter ─────────────────────────────────────────────────────────
export function formatPrice(amount: number, symbol = '£'): string {
  return `${symbol}${amount.toFixed(2)}`
}

export function formatDiscount(original: number, sale: number): string {
  const pct = Math.round((1 - sale / original) * 100)
  return `-${pct}%`
}

// ── Merchant online status ─────────────────────────────────────────────────────
export function getMerchantStatus(merchant: Merchant): MerchantStatus {
  const days: WeekDay[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = days[new Date().getDay()]
  const hours = merchant.hours[today]

  if (!hours) return { online: false, label: 'Closed today' }

  const [oh, om] = hours.open.split(':').map(Number)
  const [ch, cm] = hours.close.split(':').map(Number)
  const now = new Date().getHours() * 60 + new Date().getMinutes()
  const openMin  = oh * 60 + om
  const closeMin = ch * 60 + cm

  if (now >= openMin && now < closeMin) {
    return { online: true, label: `Open until ${hours.close}` }
  }
  if (now < openMin) {
    return { online: false, label: `Opens at ${hours.open}` }
  }
  return { online: false, label: 'Closed — replies next business day' }
}

// ── WhatsApp URL builder ────────────────────────────────────────────────────────
export function generateInquiryId(productId?: string): string {
  const ts   = Date.now().toString(36).toUpperCase()
  const slug = (productId ?? 'general')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 8)
  return `INQ-${ts}-${slug}`
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

// ── Time helpers ───────────────────────────────────────────────────────────────
export function timeAgo(timestamp: string | number): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins  = Math.floor(diff / 60_000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function countdown(endDate: string): { h: string; m: string; s: string; expired: boolean } {
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return { h: '00', m: '00', s: '00', expired: true }
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    h:       pad(Math.floor(diff / 3_600_000)),
    m:       pad(Math.floor((diff % 3_600_000) / 60_000)),
    s:       pad(Math.floor((diff % 60_000) / 1_000)),
    expired: false,
  }
}

// ── Array helpers ──────────────────────────────────────────────────────────────
export function getFeaturedProducts(merchant: Merchant) {
  return merchant.products.filter(p => p.featured && p.inStock)
}

export function getProductsByCategory(merchant: Merchant, categoryId: string) {
  return merchant.products.filter(p => p.category === categoryId && p.inStock)
}

export function getCampaignProducts(merchant: Merchant, campaignId: string) {
  const campaign = merchant.campaigns.find(c => c.id === campaignId)
  if (!campaign) return []
  return campaign.productIds
    .map(id => merchant.products.find(p => p.id === id))
    .filter(Boolean) as typeof merchant.products
}
