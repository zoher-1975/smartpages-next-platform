// ─────────────────────────────────────────────────────────────────────────────
// lib/demo-data.ts
// All static demo data for the Smart Pages platform.
// Phase 1: static only. Phase 2: replace with API calls.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  currency: string
  description: string
  shortDesc: string
  category: string
  emoji: string
  rating: number
  reviews: number
  sold: number
  inStock: boolean
  featured: boolean
  tags: string[]
}

export interface MerchantSocial {
  whatsapp:   string          // digits only, international format
  facebook?:  string          // full URL
  instagram?: string          // full URL
  tiktok?:    string          // full URL
  telegram?:  string          // full URL  (t.me/...)
  website?:   string          // full URL
}

export interface Merchant {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  whatsapp: string            // kept at top-level for backward compat
  social: MerchantSocial
  category: string
  location: string
  emoji: string
  coverColor: string          // gradient start
  rating: number
  reviews: number
  productsCount: number
  responseTime: string
  verified: boolean
}

export interface Inquiry {
  id: string
  product: string
  customer: string
  time: string
  status: 'new' | 'replied' | 'confirmed' | 'closed'
  amount: string
}

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'scheduled' | 'ended'
  reach: number
  clicks: number
  conversions: number
  budget: string
  endDate: string
  discount?: string           // e.g. '15% off'
  emoji?: string
  caption?: string            // ready-made marketing caption
  shareUrl?: string           // public catalog URL
}

export interface PlatformMerchant {
  id: string
  name: string
  category: string
  location: string
  status: 'active' | 'pending' | 'suspended'
  storeViews: number
  waClicks: number
  joinedDate: string
}

// ── Demo Merchant ─────────────────────────────────────────────────────────────

export const DEMO_MERCHANT: Merchant = {
  id:           'merchant_amani_001',
  slug:         'demo',
  name:         'AmaniRenas Beauty',
  tagline:      'Authentic Sudanese African beauty, delivered worldwide',
  description:  'Traditional Sudanese beauty rituals — khomra, dalka, bukhoor, karkar oil — crafted from heritage recipes and natural ingredients. Trusted by customers across Europe, Sudan, and the Gulf.',
  whatsapp:     '447000000000',
  social: {
    whatsapp:  '447000000000',
    facebook:  'https://facebook.com/amanirenas',
    instagram: 'https://instagram.com/amanirenas',
    tiktok:    'https://tiktok.com/@amanirenas',
    telegram:  'https://t.me/amanirenas',
    website:   'https://amanirenas.uk',
  },
  category:     'Beauty & Skincare',
  location:     'London, UK',
  emoji:        '✨',
  coverColor:   '#7B3F00',
  rating:       4.9,
  reviews:      148,
  productsCount: 24,
  responseTime: 'Usually within 1 hour',
  verified:     true,
}

// ── Demo Products ─────────────────────────────────────────────────────────────

export const DEMO_PRODUCTS: Product[] = [
  {
    id:          'prod_khomra_01',
    name:        'Khomra Face Mask',
    price:       18.99,
    currency:    'GBP',
    description: 'Our Khomra is a traditional Sudanese face mask made from natural clays, fragrant woods, and essential oils. Used for centuries by Sudanese women to achieve a smooth, radiant complexion. Apply as a paste, leave 15–20 minutes, rinse with warm water. Suitable for all skin types and free from parabens, sulfates, and artificial colours.',
    shortDesc:   'Traditional Sudanese clay face mask for radiant skin',
    category:    'Skincare',
    emoji:       '🌿',
    rating:      4.9,
    reviews:     47,
    sold:        312,
    inStock:     true,
    featured:    true,
    tags:        ['face', 'clay', 'traditional', 'natural'],
  },
  {
    id:          'prod_dalka_01',
    name:        'Dalka Body Scrub',
    price:       22.50,
    originalPrice: 28.00,
    currency:    'GBP',
    description: 'Dalka is a traditional Sudanese body scrub used after a warm bath or shower. This heritage blend of natural exfoliants and fragrant oils leaves the skin silky smooth and deeply nourished. A staple of the Sudanese hammam ritual, free from synthetic fragrances and mineral oils.',
    shortDesc:   'Heritage Sudanese body scrub — silky smooth skin',
    category:    'Body Care',
    emoji:       '🛁',
    rating:      4.8,
    reviews:     35,
    sold:        198,
    inStock:     true,
    featured:    true,
    tags:        ['body', 'scrub', 'hammam', 'natural'],
  },
  {
    id:          'prod_bukhoor_01',
    name:        'Bukhoor — Nile Oud',
    price:       14.99,
    currency:    'GBP',
    description: 'Handcrafted Bukhoor from the finest Sudanese Oud wood chips, blended with rose, amber, and sandalwood. Burn on charcoal or an electric mabkhara to fill your home with warm, rich fragrance. A beloved tradition in Sudanese and Gulf homes, each piece burns for approximately 2–3 hours.',
    shortDesc:   'Sudanese oud incense — rose, amber & sandalwood',
    category:    'Fragrance',
    emoji:       '🌹',
    rating:      5.0,
    reviews:     62,
    sold:        441,
    inStock:     true,
    featured:    true,
    tags:        ['incense', 'oud', 'fragrance', 'bukhoor'],
  },
  {
    id:          'prod_karkar_01',
    name:        'Karkar Beauty Oil',
    price:       16.00,
    currency:    'GBP',
    description: 'Traditional Sudanese Karkar oil — sesame oil infused with fragrant spices and natural resins. Used on hair for shine and deep conditioning, and on the body for rich moisturising. An authentic Sudanese beauty secret passed down through generations.',
    shortDesc:   'Multi-use scented oil for hair and body',
    category:    'Hair Care',
    emoji:       '💫',
    rating:      4.7,
    reviews:     28,
    sold:        156,
    inStock:     true,
    featured:    false,
    tags:        ['oil', 'hair', 'body', 'sesame'],
  },
  {
    id:          'prod_sesame_01',
    name:        'Pure Sesame Oil',
    price:       12.50,
    currency:    'GBP',
    description: 'Cold-pressed pure sesame oil from Sudanese sesame seeds. Rich in antioxidants and natural vitamin E. Excellent for cooking, skincare, and hair conditioning. 100% natural with no additives, preservatives, or artificial ingredients.',
    shortDesc:   'Cold-pressed Sudanese sesame oil — pure & natural',
    category:    'Natural Oils',
    emoji:       '🌾',
    rating:      4.8,
    reviews:     19,
    sold:        87,
    inStock:     true,
    featured:    false,
    tags:        ['oil', 'sesame', 'natural', 'cooking'],
  },
  {
    id:          'prod_gift_01',
    name:        'Heritage Gift Set',
    price:       45.00,
    currency:    'GBP',
    description: 'A curated gift set featuring our most-loved Sudanese beauty products: Khomra Face Mask, Dalka Body Scrub, and Bukhoor Nile Oud. Presented in a beautiful handcrafted box — the perfect gift for any occasion.',
    shortDesc:   'Curated Sudanese beauty gift box — 3 bestsellers',
    category:    'Gift Sets',
    emoji:       '🎁',
    rating:      4.9,
    reviews:     31,
    sold:        89,
    inStock:     true,
    featured:    true,
    tags:        ['gift', 'set', 'collection'],
  },
]

// ── Dashboard demo data ───────────────────────────────────────────────────────

export const DASHBOARD_STATS = {
  storeViews:    1_247,
  waClicks:      384,
  inquiries:     67,
  productsCount: 24,
  campaignsCount: 3,
  conversionRate: '30.8%',
  avgResponseTime: '42 min',
  thisWeekViews:  312,
  lastWeekViews:  258,
}

export const DEMO_INQUIRIES: Inquiry[] = [
  { id: 'INQ-M2X4-KHOMRA',  product: 'Khomra Face Mask',   customer: 'Sara A.',   time: '2 min ago',  status: 'new',       amount: '£18.99' },
  { id: 'INQ-L9R2-BUKHOOR', product: 'Bukhoor Nile Oud',   customer: 'Fatima K.', time: '18 min ago', status: 'new',       amount: '£14.99' },
  { id: 'INQ-P5T8-GIFT',    product: 'Heritage Gift Set',   customer: 'Mona H.',   time: '1 hr ago',   status: 'replied',   amount: '£45.00' },
  { id: 'INQ-Q3N1-DALKA',   product: 'Dalka Body Scrub',    customer: 'Amira R.',  time: '3 hr ago',   status: 'confirmed', amount: '£22.50' },
  { id: 'INQ-K7V6-KARKAR',  product: 'Karkar Beauty Oil',   customer: 'Nadia M.',  time: '5 hr ago',   status: 'confirmed', amount: '£16.00' },
  { id: 'INQ-W2X9-SESAME',  product: 'Pure Sesame Oil',     customer: 'Layla B.',  time: '1 day ago',  status: 'closed',    amount: '£12.50' },
  { id: 'INQ-R4T2-KHOMRA',  product: 'Khomra Face Mask',   customer: 'Hana J.',   time: '1 day ago',  status: 'closed',    amount: '£18.99' },
]

export const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_01', name: 'Ramadan Special', status: 'active',
    reach: 4_200, clicks: 312, conversions: 48, budget: '£0', endDate: 'Mar 30',
    discount: '15% off', emoji: '🌙',
    caption: '🌙 Ramadan Mubarak! Celebrate with authentic Sudanese beauty rituals.\n\n✨ 15% OFF selected products — limited time only!\n\n🛍️ Shop our heritage collection:\n• Khomra Face Mask — £18.99\n• Dalka Body Scrub — £22.50\n• Karkar Beauty Oil — £16.00\n\n💬 Order via WhatsApp — fast replies guaranteed\n📦 Shipping to UK, EU & Gulf\n\n#RamadanSpecial #SudaneseBeauty #AmaniRenas #NaturalBeauty',
    shareUrl: 'https://smartpages-next-platform-puce.vercel.app/store/demo',
  },
  {
    id: 'camp_02', name: 'Eid Gift Bundle', status: 'scheduled',
    reach: 0, clicks: 0, conversions: 0, budget: '£0', endDate: 'Apr 10',
    discount: '10% off bundles', emoji: '🎁',
    caption: '🎁 Eid Mubarak! Give the gift of authentic Sudanese beauty.\n\n✨ Gift sets from £45 — beautifully packaged & ready to gift!\n\n💬 Order via WhatsApp\n📦 Shipping UK, EU & Gulf\n\n#EidGifts #SudaneseBeauty #AmaniRenas',
    shareUrl: 'https://smartpages-next-platform-puce.vercel.app/store/demo',
  },
  {
    id: 'camp_03', name: 'Spring Skincare', status: 'ended',
    reach: 3_100, clicks: 228, conversions: 31, budget: '£0', endDate: 'Mar 15',
    discount: '20% off skincare', emoji: '🌸',
    caption: '🌸 Spring into natural skincare with AmaniRenas Beauty.\n\n✨ Traditional recipes, modern results.\n\n#SpringSkincare #SudaneseBeauty #AmaniRenas',
    shareUrl: 'https://smartpages-next-platform-puce.vercel.app/store/demo',
  },
]

export const WEEKLY_VIEWS = [42, 58, 71, 65, 88, 94, 103]
export const WEEKLY_WA    = [12, 19, 22, 18, 31, 28, 35]
export const WEEK_LABELS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ── Platform admin data ───────────────────────────────────────────────────────

export const PLATFORM_STATS = {
  totalMerchants:  47,
  activeStores:    39,
  totalWaClicks:   12_840,
  totalStoreViews: 98_420,
  totalInquiries:  3_217,
  avgConversion:   '25.1%',
  newThisMonth:    8,
  churnedThisMonth: 1,
}

export const PLATFORM_MERCHANTS: PlatformMerchant[] = [
  { id: 'm01', name: 'AmaniRenas Beauty',   category: 'Beauty',     location: 'London, UK',      status: 'active',    storeViews: 1247, waClicks: 384, joinedDate: 'Jan 2026' },
  { id: 'm02', name: 'Nile Spice House',    category: 'Food',       location: 'Khartoum, Sudan', status: 'active',    storeViews: 892,  waClicks: 241, joinedDate: 'Jan 2026' },
  { id: 'm03', name: 'Gulf Gold Jewellery', category: 'Jewellery',  location: 'Dubai, UAE',      status: 'active',    storeViews: 2341, waClicks: 678, joinedDate: 'Feb 2026' },
  { id: 'm04', name: 'Sahara Crafts',       category: 'Handicrafts',location: 'Cairo, Egypt',    status: 'active',    storeViews: 567,  waClicks: 143, joinedDate: 'Feb 2026' },
  { id: 'm05', name: 'Desert Rose Fashion', category: 'Fashion',    location: 'Riyadh, KSA',     status: 'pending',   storeViews: 0,    waClicks: 0,   joinedDate: 'Mar 2026' },
  { id: 'm06', name: 'Oasis Electronics',   category: 'Electronics',location: 'Abu Dhabi, UAE',  status: 'suspended', storeViews: 234,  waClicks: 56,  joinedDate: 'Dec 2025' },
]

// ── WhatsApp helpers ──────────────────────────────────────────────────────────

export function buildWhatsAppUrl(
  whatsappNumber: string,
  productName: string,
  productId: string,
  price: string
): string {
  const inquiryId = `INQ-${Date.now().toString(36).toUpperCase().slice(-6)}-${productId.slice(-4).toUpperCase()}`
  const message = [
    `Hello! 👋 I'm interested in ordering:`,
    ``,
    `*${productName}*`,
    `Price: ${price}`,
    ``,
    `Ref: ${inquiryId}`,
    ``,
    `Please confirm availability. Thank you!`,
  ].join('\n')
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

// ── Sharing URL builders ──────────────────────────────────────────────────────
// Phase 1: share links + clipboard. No API integrations yet.

export type ShareEvent =
  | 'shared_to_whatsapp'
  | 'shared_to_facebook'
  | 'shared_to_telegram'
  | 'copied_instagram_caption'
  | 'copied_link'
  | 'downloaded_campaign_card'
  | 'product_shared'
  | 'product_whatsapp_clicked'

/** Build a pre-filled WhatsApp share message for a store */
export function buildStoreShareWA(merchant: Merchant, pageUrl: string): string {
  const msg = [
    `✨ Check out ${merchant.name} on Smart Pages!`,
    ``,
    `${merchant.tagline}`,
    ``,
    `🛍️ Browse our products and order via WhatsApp:`,
    pageUrl,
  ].join('\n')
  return `https://wa.me/?text=${encodeURIComponent(msg)}`
}

/** Build a pre-filled WhatsApp share message for a product */
export function buildProductShareWA(
  merchant: Merchant,
  product: Product,
  pageUrl: string
): string {
  const price = `£${product.price.toFixed(2)}`
  const msg = [
    `${product.emoji} *${product.name}* — ${price}`,
    ``,
    `${product.shortDesc}`,
    ``,
    `🛍️ Order via WhatsApp:`,
    pageUrl,
    ``,
    `by ${merchant.name} ✨`,
  ].join('\n')
  return `https://wa.me/?text=${encodeURIComponent(msg)}`
}

/** Build a pre-filled WhatsApp share message for a campaign */
export function buildCampaignShareWA(
  merchant: Merchant,
  campaign: Campaign,
  pageUrl: string
): string {
  const msg = [
    `${campaign.emoji ?? '🔥'} *${campaign.name}* — ${merchant.name}`,
    ``,
    campaign.discount ? `🏷️ ${campaign.discount}` : '',
    ``,
    `🛍️ Shop the campaign:`,
    pageUrl,
    ``,
    `⏰ Ends ${campaign.endDate}`,
  ].filter(l => l !== '').join('\n')
  return `https://wa.me/?text=${encodeURIComponent(msg)}`
}

/** Facebook share URL */
export function buildFacebookShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
}

/** Telegram share URL */
export function buildTelegramShareUrl(text: string, pageUrl: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`
}
