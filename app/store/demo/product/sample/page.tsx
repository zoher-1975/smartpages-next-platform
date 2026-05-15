import type { Metadata } from 'next'
import Link from 'next/link'
import { DEMO_MERCHANT, DEMO_PRODUCTS } from '@/lib/demo-data'
import {
  buildProductShareWA, buildFacebookShareUrl, buildTelegramShareUrl,
} from '@/lib/demo-data'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ProductCard } from '@/components/storefront/ProductCard'
import { ShareBarClient } from '@/components/ui/ShareBarClient'

export const metadata: Metadata = {
  title:       'Khomra Face Mask · AmaniRenas Beauty',
  description: 'Traditional Sudanese face mask. Natural clay, sandalwood, rose water. Order via WhatsApp.',
}

export default function ProductSamplePage() {
  const m       = DEMO_MERCHANT
  const product = DEMO_PRODUCTS[0]
  const related = DEMO_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)
  const price   = `£${product.price.toFixed(2)}`

  const BASE_URL = 'https://smartpages-next-platform-puce.vercel.app'
  const pageUrl  = `${BASE_URL}/store/demo/product/sample`
  const waShareUrl = buildProductShareWA(m, product, pageUrl)
  const fbUrl      = buildFacebookShareUrl(pageUrl)
  const tgUrl      = buildTelegramShareUrl(`${product.emoji} ${product.name} — ${price}`, pageUrl)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center h-14 px-4 gap-3 max-w-xl mx-auto">
          <Link href="/store/demo"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center
                           hover:bg-gray-200 transition-colors font-bold text-gray-700 text-sm
                           flex-shrink-0">
            ←
          </Link>
          <span className="flex-1 text-sm font-semibold text-gray-900 truncate min-w-0">
            {product.name}
          </span>
          <Link href="/store/demo" className="text-xs text-gray-400 hover:text-gray-700 flex-shrink-0">
            Store
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto pb-32">

        {/* ── Product image ── */}
        <div className="relative bg-gradient-to-br from-[#FAF7F2] via-[#F5EEE3] to-[#EDE0CC]
                        aspect-square flex items-center justify-center overflow-hidden">
          <span className="text-[120px] select-none">{product.emoji}</span>

          {/* Thumbs strip */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {[1,2,3].map(i => (
              <div key={i}
                   className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center
                               text-xl bg-white/80 backdrop-blur-sm cursor-pointer
                               transition-all ${i === 1 ? 'border-[#7B3F00] shadow-sm' : 'border-transparent opacity-60'}`}>
                {product.emoji}
              </div>
            ))}
          </div>

          {/* Image count */}
          <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs
                          px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
            1 / 3
          </div>
        </div>

        {/* ── Product info ── */}
        <div className="px-4 pt-5">
          {/* Category */}
          <span className="inline-block text-xs font-bold text-[#7B3F00] bg-[#7B3F00]/8
                           px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-2">
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-xl font-black text-gray-900 leading-tight mb-3">{product.name}</h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                       fill={i <= Math.round(product.rating) ? '#F59E0B' : '#E5E7EB'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
            </div>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500 font-medium">
              {product.sold.toLocaleString()} sold
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-black text-gray-900">{price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">
                  Save £{(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-semibold text-green-700">In stock</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">Ships within 2–3 business days</span>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">About this product</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500
                                           px-2.5 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details table */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Product Details</h2>
            <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
              {[
                { k:'Type',        v:'Face Mask Powder'                      },
                { k:'Volume',      v:'100g'                                  },
                { k:'Origin',      v:'Sudan'                                 },
                { k:'Skin type',   v:'All skin types'                        },
                { k:'Free from',   v:'Parabens, sulfates, artificial colours'},
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-gray-400 font-medium">{k}</span>
                  <span className="text-xs text-gray-900 font-semibold text-right ml-4">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Merchant card */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Sold by</h2>
            <div className="bg-[#FAF7F2] border border-[#E8E0D4] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#7B3F00] flex items-center justify-center text-2xl">
                  {m.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.responseTime}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-bold
                                 px-2 py-0.5 rounded-full flex-shrink-0">
                  ✅ Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {m.description}
              </p>
            </div>
          </div>

          {/* ── Share this product ── */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Share this product</h2>
            <ShareBarClient
              waUrl={waShareUrl} fbUrl={fbUrl} tgUrl={tgUrl} copyUrl={pageUrl}
              eventPrefix="product"
            />
          </div>

          {/* Related products */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-4">You might also like</h2>
            <div className="grid grid-cols-2 gap-3">
              {related.map(p => (
                <ProductCard key={p.id} product={p} whatsapp={m.whatsapp} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky WhatsApp CTA bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/97 backdrop-blur-md
                      border-t border-gray-100 shadow-sticky">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3"
             style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          {/* Price */}
          <div className="flex-shrink-0">
            <p className="text-xl font-black text-gray-900 leading-none">{price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                £{product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          {/* Button */}
          <div className="flex-1">
            <WhatsAppButton
              whatsapp={m.whatsapp}
              productName={product.name}
              productId={product.id}
              price={price}
              variant="full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
