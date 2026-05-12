// ─────────────────────────────────────────────────────────────────────────────
// types/merchant.ts
// Core domain types for the WhatsApp-first merchant commerce platform.
// Used across storefront, dashboard, and admin layers.
// ─────────────────────────────────────────────────────────────────────────────

// ── Merchant ──────────────────────────────────────────────────────────────────

export interface MerchantColors {
  primary:   string   // e.g. '#7B3F00'
  secondary: string   // e.g. '#D4AF37'
  surface:   string   // e.g. '#FAF7F2'
  text:      string   // e.g. '#1A1206'
}

export interface BusinessHours {
  open:  string   // '09:00'
  close: string   // '18:00'
}

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export interface Merchant {
  id:              string
  slug:            string
  name:            string
  tagline:         string
  description:     string
  whatsapp:        string   // international format, digits only
  logo:            string   // URL or /public path
  banner:          string
  colors:          MerchantColors
  location:        string
  website:         string
  email:           string
  currency:        string   // 'GBP'
  currencySymbol:  string   // '£'
  languages:       string[]
  hours:           Partial<Record<WeekDay, BusinessHours | null>>
  stats:           MerchantStats
  categories:      Category[]
  products:        Product[]
  campaigns:       Campaign[]
  social?: {
    instagram?: string
    facebook?:  string
    tiktok?:    string
  }
}

export interface MerchantStats {
  products:  number
  reviews:   number
  rating:    number
}

export interface MerchantStatus {
  online:  boolean
  label:   string    // 'Open until 18:00' | 'Opens at 09:00' | 'Closed today'
}

// ── Category ──────────────────────────────────────────────────────────────────

export interface Category {
  id:   string
  name: string
  icon: string   // /public path
}

// ── Product ───────────────────────────────────────────────────────────────────

export interface ProductVariants {
  sizes:  string[]
  colors: Array<{ name: string; hex: string }>
}

export interface ProductAttribute {
  key:   string
  value: string
}

export interface Product {
  id:           string
  name:         string
  shortName:    string
  category:     string    // Category id
  price:        number
  origPrice:    number | null
  currency:     string
  images:       string[]  // /public paths
  thumbnail:    string
  rating:       number
  reviewCount:  number
  sold:         number
  description:  string
  attributes:   ProductAttribute[]
  variants:     ProductVariants
  inStock:      boolean
  featured:     boolean
  campaignIds:  string[]
}

// ── Campaign ──────────────────────────────────────────────────────────────────

export interface Campaign {
  id:          string
  title:       string
  subtitle:    string
  discountPct: number
  startDate:   string   // ISO date string 'YYYY-MM-DD'
  endDate:     string
  active:      boolean
  banner:      string
  productIds:  string[]
  shareUrl:    string
}

// ── Inquiry (WhatsApp lead) ───────────────────────────────────────────────────

export type InquiryStatus = 'new' | 'replied' | 'quoted' | 'confirmed' | 'closed'

export interface Inquiry {
  id:          string    // INQ-{ts36}-{SLUG}
  productId:   string | null
  productName: string | null
  price:       number | null
  quantity:    number
  size:        string | null
  color:       string | null
  sourceUrl:   string
  timestamp:   string   // ISO string
  status:      InquiryStatus
  updatedAt?:  string
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface DailyCount {
  date:  string   // 'YYYY-MM-DD'
  count: number
}

export interface DashboardStats {
  views:       number
  prodViews:   number
  waTaps:      number
  searches:    number
  sessions:    number
  topProducts: Array<{ id: string; views: number }>
  dailyTaps:   DailyCount[]
  days:        number
}

// ── WhatsApp message builder ──────────────────────────────────────────────────

export interface WhatsAppMessageOptions {
  product?:       Product
  merchant:       Merchant
  quantity?:      number
  selectedSize?:  string | null
  selectedColor?: string | null
  sourceUrl?:     string
  inquiryId?:     string
}
