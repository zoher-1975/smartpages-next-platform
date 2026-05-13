'use client'

import Link from 'next/link'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import type { Product } from '@/lib/demo-data'

interface ProductCardProps {
  product:   Product
  whatsapp:  string
  currency?: string
}

export function ProductCard({ product, whatsapp, currency = '£' }: ProductCardProps) {
  const hasSale = product.originalPrice && product.originalPrice > product.price
  const price   = `${currency}${product.price.toFixed(2)}`

  return (
    <div className="group bg-white rounded-2xl border border-gray-100
                    shadow-sm hover:shadow-md transition-all duration-200
                    overflow-hidden flex flex-col">

      {/* Image area */}
      <Link href="/store/demo/product/sample" className="block">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100
                        flex items-center justify-center relative overflow-hidden">
          <span className="text-5xl select-none group-hover:scale-110
                           transition-transform duration-300">
            {product.emoji}
          </span>
          {hasSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white
                             text-xs font-bold px-2 py-0.5 rounded-lg">
              SALE
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <Link href="/store/demo/product/sample">
            <h3 className="text-sm font-semibold text-gray-900 leading-snug
                           hover:text-[#7B3F00] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="11" height="11" viewBox="0 0 24 24"
                   fill={i <= Math.round(product.rating) ? '#F59E0B' : '#E5E7EB'}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price + WA */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="text-base font-black text-gray-900">{price}</span>
            {hasSale && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                {currency}{product.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>
          <WhatsAppButton
            whatsapp={whatsapp}
            productName={product.name}
            productId={product.id}
            price={price}
            variant="icon"
          />
        </div>
      </div>
    </div>
  )
}

export function ProductGrid({ products, whatsapp, currency = '£' }:
  { products: Product[]; whatsapp: string; currency?: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} whatsapp={whatsapp} currency={currency} />
      ))}
    </div>
  )
}
