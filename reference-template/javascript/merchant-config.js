/**
 * merchant-config.js — Merchant data layer
 * Demo merchant: AmaniRenas Beauty
 * Phase 1: Static JSON. Phase 2: Replace with API fetch by slug.
 * Platform: WhatsApp-First Social Commerce SaaS
 */
'use strict';

const MERCHANT = {
  id:          'merchant_amani_001',
  slug:        'amanirenas',
  name:        'AmaniRenas Beauty',
  tagline:     'Authentic Sudanese African beauty, delivered worldwide',
  description: 'AmaniRenas Beauty brings traditional Sudanese beauty rituals — khomra, dalka, bukhoor, and karkar oil — to customers across Europe and beyond.',
  whatsapp:    '447000000000',
  logo:        'assets/images/merchant/logo.png',
  banner:      'assets/images/merchant/banner.jpg',
  colors: {
    primary:   '#7B3F00',
    secondary: '#D4AF37',
    surface:   '#FAF7F2',
    text:      '#1A1206',
  },
  location:    'London, UK',
  website:     'https://amanirenas.uk',
  email:       'hello@amanirenas.uk',
  social:      { instagram: 'amanirenas', facebook: 'amanirenas' },
  hours: {
    Mon: { open:'09:00', close:'18:00' },
    Tue: { open:'09:00', close:'18:00' },
    Wed: { open:'09:00', close:'18:00' },
    Thu: { open:'09:00', close:'18:00' },
    Fri: { open:'09:00', close:'14:00' },
    Sat: { open:'10:00', close:'16:00' },
    Sun: null,
  },
  currency:        'GBP',
  currencySymbol:  '£',
  languages:       ['en','ar'],
  stats:           { products:24, reviews:148, rating:4.9 },

  categories: [
    { id:'cat_01', name:'Skincare',  icon:'assets/images/home-screen/categories-img1.png' },
    { id:'cat_02', name:'Fragrance', icon:'assets/images/home-screen/categories-img2.png' },
    { id:'cat_03', name:'Body Care', icon:'assets/images/home-screen/categories-img3.png' },
    { id:'cat_04', name:'Hair Care', icon:'assets/images/home-screen/categories-img4.png' },
    { id:'cat_05', name:'Gift Sets', icon:'assets/images/home-screen/categories-img5.png' },
    { id:'cat_06', name:'All Items', icon:'assets/images/home-screen/categories-img6.png' },
  ],

  products: [
    {
      id:         'prod_khomra_01',
      name:       'Khomra Face Mask — Traditional Sudanese',
      shortName:  'Khomra Face Mask',
      category:   'cat_01',
      price:       18.99,
      origPrice:   null,
      images: [
        'assets/images/single-product-screen/WomenSlider-img1.png',
        'assets/images/single-product-screen/WomenSlider-img2.png',
        'assets/images/single-product-screen/WomenSlider-img3.png',
      ],
      thumbnail:   'assets/images/home-screen/womenPro1.png',
      rating:      4.9,
      reviewCount: 47,
      sold:        312,
      description: 'Our Khomra is a traditional Sudanese face mask made from natural clays, fragrant woods, and essential oils. Used for centuries by Sudanese women to achieve a smooth, radiant complexion. Apply as a paste, leave 15–20 min, rinse with warm water.',
      attributes: [
        { key:'Type',        value:'Face Mask Powder' },
        { key:'Volume',      value:'100g' },
        { key:'Origin',      value:'Sudan' },
        { key:'Ingredients', value:'Natural clay, sandalwood, rose water' },
        { key:'Skin type',   value:'All skin types' },
        { key:'Free from',   value:'Parabens, sulfates, artificial colours' },
      ],
      variants:    { sizes:[], colors:[] },
      inStock:     true,
      featured:    true,
      campaignIds: ['camp_ramadan_01'],
    },
    {
      id:         'prod_dalka_01',
      name:       'Dalka Body Scrub — Heritage Blend',
      shortName:  'Dalka Body Scrub',
      category:   'cat_03',
      price:       22.50,
      origPrice:   28.00,
      images: [
        'assets/images/single-product-screen/ShoesPro-img1.png',
        'assets/images/single-product-screen/ShoesPro-img2.png',
      ],
      thumbnail:   'assets/images/home-screen/womenPro3.png',
      rating:      4.8,
      reviewCount: 35,
      sold:        198,
      description: 'Dalka is a traditional Sudanese body scrub used after a warm bath. This heritage blend of natural exfoliants and fragrant oils leaves skin silky smooth and deeply nourished.',
      attributes: [
        { key:'Type',      value:'Body Scrub' },
        { key:'Volume',    value:'200g' },
        { key:'Origin',    value:'Sudan' },
        { key:'Usage',     value:'Post-bath, 2–3 times per week' },
        { key:'Free from', value:'Synthetic fragrances, mineral oils' },
      ],
      variants:    { sizes:[], colors:[] },
      inStock:     true,
      featured:    true,
      campaignIds: ['camp_ramadan_01'],
    },
    {
      id:         'prod_bukhoor_01',
      name:       'Bukhoor Incense — Nile Oud Blend',
      shortName:  'Bukhoor — Nile Oud',
      category:   'cat_02',
      price:       14.99,
      origPrice:   null,
      images: [
        'assets/images/single-product-screen/ElectProSlider-img1.png',
        'assets/images/single-product-screen/ElectProSlider-img2.png',
      ],
      thumbnail:   'assets/images/home-screen/womenPro4.png',
      rating:      5.0,
      reviewCount: 62,
      sold:        441,
      description: 'Handcrafted Bukhoor from the finest Sudanese Oud wood, blended with rose, amber, and sandalwood. Burn on charcoal to fill your home with warm, rich fragrance.',
      attributes: [
        { key:'Type',      value:'Incense / Bukhoor' },
        { key:'Weight',    value:'50g' },
        { key:'Base',      value:'Oud wood chips' },
        { key:'Scent',     value:'Oud, rose, amber, sandalwood' },
        { key:'Burn time', value:'Approx. 2–3 hours per piece' },
      ],
      variants:    { sizes:[], colors:[] },
      inStock:     true,
      featured:    true,
      campaignIds: [],
    },
    {
      id:         'prod_karkar_01',
      name:       'Karkar Oil — Scented Hair & Body',
      shortName:  'Karkar Oil',
      category:   'cat_04',
      price:       16.00,
      origPrice:   null,
      images: [
        'assets/images/single-product-screen/WomenSlider-img1.png',
      ],
      thumbnail:   'assets/images/home-screen/womenPro5.png',
      rating:      4.7,
      reviewCount: 28,
      sold:        156,
      description: 'Traditional Sudanese Karkar oil — sesame oil infused with fragrant spices and natural resins. Used on hair for shine and conditioning, and on the body for deep moisturising.',
      attributes: [
        { key:'Type',   value:'Multi-use Beauty Oil' },
        { key:'Volume', value:'100ml' },
        { key:'Base',   value:'Cold-pressed sesame oil' },
        { key:'Usage',  value:'Hair & body' },
        { key:'Vegan',  value:'Yes' },
      ],
      variants:    { sizes:[], colors:[] },
      inStock:     true,
      featured:    false,
      campaignIds: ['camp_ramadan_01'],
    },
    {
      id:         'prod_sesame_01',
      name:       'Pure Sudanese Sesame Oil — Cold Pressed',
      shortName:  'Sesame Oil',
      category:   'cat_03',
      price:       12.50,
      origPrice:   null,
      images: [
        'assets/images/single-product-screen/ShoesPro-img3.png',
      ],
      thumbnail:   'assets/images/home-screen/womenPro6.png',
      rating:      4.8,
      reviewCount: 19,
      sold:        87,
      description: 'Cold-pressed pure sesame oil from Sudanese sesame seeds. Rich in antioxidants and vitamin E. For cooking, skincare, and hair conditioning. 100% natural, no additives.',
      attributes: [
        { key:'Type',    value:'Cold-pressed Oil' },
        { key:'Volume',  value:'250ml' },
        { key:'Origin',  value:'Sudan' },
        { key:'Usage',   value:'Cooking, skincare, hair' },
        { key:'Organic', value:'Yes' },
      ],
      variants:    { sizes:[], colors:[] },
      inStock:     true,
      featured:    false,
      campaignIds: [],
    },
  ],

  campaigns: [
    {
      id:          'camp_ramadan_01',
      title:       'Ramadan Special',
      subtitle:    'Selected heritage beauty products',
      discountPct: 15,
      startDate:   '2026-02-28',
      endDate:     '2026-03-30',
      active:      true,
      banner:      'assets/images/home-screen/home2Slider-img1.jpg',
      productIds:  ['prod_khomra_01','prod_dalka_01','prod_karkar_01'],
      shareUrl:    'https://amanirenas.uk/campaign/ramadan',
    },
  ],
};

// ─── Apply CSS theme variables from merchant config ───────────────
function applyMerchantTheme(m) {
  m = m || MERCHANT;
  const r = document.documentElement;
  if (m.colors) {
    r.style.setProperty('--merchant-primary',   m.colors.primary);
    r.style.setProperty('--merchant-secondary', m.colors.secondary);
    r.style.setProperty('--merchant-surface',   m.colors.surface);
    r.style.setProperty('--merchant-text',      m.colors.text);
  }
}

// ─── Check if merchant is currently online ───────────────────────
function getMerchantStatus(m) {
  m = m || MERCHANT;
  const days  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = days[new Date().getDay()];
  const hrs   = m.hours[today];
  if (!hrs) return { online:false, label:'Closed today' };
  const now = new Date().getHours()*60 + new Date().getMinutes();
  const [oh,om] = hrs.open.split(':').map(Number);
  const [ch,cm] = hrs.close.split(':').map(Number);
  if (now >= oh*60+om && now < ch*60+cm)
    return { online:true, label:`Open until ${hrs.close}` };
  if (now < oh*60+om)
    return { online:false, label:`Opens at ${hrs.open}` };
  return { online:false, label:'Closed — replies next business day' };
}

function getProduct(id)         { return MERCHANT.products.find(p => p.id === id) || null; }
function formatPrice(n, m)      { m=m||MERCHANT; return `${m.currencySymbol}${Number(n).toFixed(2)}`; }
function getFeaturedProducts()  { return MERCHANT.products.filter(p => p.featured && p.inStock); }
function getCampaignProducts(id){ const c=MERCHANT.campaigns.find(c=>c.id===id); return c ? c.productIds.map(getProduct).filter(Boolean) : []; }
