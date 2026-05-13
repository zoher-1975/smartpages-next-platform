import type { Metadata } from 'next'
import Link from 'next/link'
import { DEMO_MERCHANT, DEMO_PRODUCTS } from '@/lib/demo-data'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ProductCard } from '@/components/storefront/ProductCard'

export const metadata: Metadata = {
  title:       'Khomra Face Mask — AmaniRenas Beauty',
  description: 'Traditional Sudanese face mask. Order via WhatsApp for fast delivery.',
}

export default function ProductSamplePage() {
  const merchant = DEMO_MERCHANT
  const product  = DEMO_PRODUCTS[0]   // Khomra as sample product
  const related  = DEMO_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)
  const price    = `£${product.price.toFixed(2)}`

  return (
    <div className="min-h-screen bg-white">

      {/* ── Top nav ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center h-14 px-4 gap-3 max-w-xl mx-auto">
          <Link href="/store/demo"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center
                           hover:bg-gray-200 transition-colors text-sm font-bold text-gray-700">
            ←
          </Link>
          <span className="flex-1 text-sm font-semibold text-gray-900 truncate">
            {product.name}
          </span>
          <Link href="/store/demo"
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
            Store
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto">

        {/* ── Product image ── */}
        <div className="aspect-square bg-gradient-to-br from-[#FAF7F2] to-[#F0E8DC]
                        flex items-center justify-center relative overflow-hidden">
          <span className="text-9xl select-none">{product.emoji}</span>

          {/* Image count overlay */}
          <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs
                          px-2.5 py-1 rounded-full font-medium">
            1 / 3
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {[1,2,3].map(i => (
              <div key={i} className={`w-8 h-8 rounded-lg border-2 flex items-center
                                       justify-center text-base
                                       ${i === 1 ? 'border-[#7B3F00] bg-white' : 'border-transparent bg-white/50'}`}>
                {product.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* ── Product info ── */}
        <div className="px-4 pt-5">

          {/* Category + name */}
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h1 className="text-xl font-black text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                       fill={i <= Math.round(product.rating) ? '#F59E0B' : '#E5E7EB'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900 ml-1">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
            </div>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{product.sold.toLocaleString()} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-3xl font-black text-gray-900">{price}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-gray-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">
                  Save £{(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* In stock */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-semibold text-green-700">In stock — ships within 2-3 days</span>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-5 mb-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">About this product</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500
                                         px-2.5 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Attributes */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden mb-6">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Product Details</h2>
            </div>
            {[
              { k: 'Type',        v: 'Face Mask Powder' },
              { k: 'Volume',      v: '100g' },
              { k: 'Origin',      v: 'Sudan' },
              { k: 'Skin type',   v: 'All skin types' },
              { k: 'Free from',   v: 'Parabens, sulfates, artificial colours' },
            ].map(({ k, v }) => (
              <div key={k} className="flex items-start justify-between px-4 py-3
                                       border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 font-medium">{k}</span>
                <span className="text-xs text-gray-900 font-semibold text-right ml-4">{v}</span>
              </div>
            ))}
          </div>

          {/* Merchant info */}
          <div className="bg-[#FAF7F2] border border-[#E8E0D4] rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#7B3F00] flex items-center
                              justify-center text-xl">
                {merchant.emoji}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{merchant.name}</p>
                <p className="text-xs text-gray-500">{merchant.responseTime}</p>
              </div>
              <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold
                               px-2 py-0.5 rounded-full">✅ Verified</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{merchant.description}</p>
          </div>
        </div>

        {/* ── Related products ── */}
        <div className="px-4 mb-24">
          <h2 className="text-base font-bold text-gray-900 mb-4">You might also like</h2>
          <div className="grid grid-cols-2 gap-3">
            {related.map(p => (
              <ProductCard key={p.id} product={p} whatsapp={merchant.whatsapp} />
            ))}
          </div>
        </div>

      </div>

      {/* ── Sticky WhatsApp CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50
                      bg-white border-t border-gray-100 shadow-xl
                      px-4 py-3 pb-safe"
           style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <div className="flex-shrink-0 text-center">
            <p className="text-xl font-black text-gray-900 leading-none">{price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                £{product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex-1">
            <WhatsAppButton
              whatsapp={merchant.whatsapp}
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
