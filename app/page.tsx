import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:       'Smart Pages — WhatsApp-First Social Commerce',
  description: 'Turn social media clicks into WhatsApp conversations. Build a branded mobile storefront for your business in minutes.',
}

function WAIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="bg-gray-950 overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center
                      bg-gray-950/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center
                            shadow-[0_0_12px_rgba(37,211,102,0.4)]">
              <span className="text-white font-black text-sm">SP</span>
            </div>
            <span className="text-white font-bold tracking-tight">Smart Pages</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {[['How it works','#how-it-works'],['Demo Store','/store/demo'],['Dashboard','/dashboard']].map(([l,h]) => (
              <Link key={l} href={h} className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-all">{l}</Link>
            ))}
          </div>
          <Link href="/store/demo"
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold
                           px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(37,211,102,0.35)]
                           hover:bg-[#1da851] transition-all active:scale-95">
            <WAIcon size={14} /> Try Demo
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center
                          pt-24 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[700px] h-[500px] rounded-full bg-[#25D366]/7 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.025]"
               style={{ backgroundImage:'radial-gradient(#fff 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 bg-[#25D366]/10 border border-[#25D366]/20
                          text-[#25D366] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            WhatsApp Commerce · Phase 1 Live
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]
                         tracking-tight text-white mb-6">
            Sell through{' '}<span className="text-[#25D366]">WhatsApp.</span><br/>
            <span className="text-gray-500">No cart. No friction.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">
            Smart Pages turns your catalogue into a mobile storefront.
            Customers browse, tap once — their inquiry lands in your WhatsApp with a unique tracking ID.
            Built for merchants in Sudan, the Gulf, and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/store/demo"
                  className="btn-wa text-base w-full sm:w-auto justify-center px-8 py-4">
              <WAIcon size={20}/> View Demo Storefront
            </Link>
            <Link href="/dashboard"
                  className="flex items-center justify-center gap-2 bg-white/8 border border-white/12
                             text-white font-semibold text-base px-8 py-4 rounded-2xl
                             hover:bg-white/12 transition-colors w-full sm:w-auto">
              Merchant Dashboard →
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
            {[['47+','Active merchants'],['98K','Monthly views'],['12,840','WA clicks/mo'],['25%','Avg conversion']].map(([n,l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="text-white font-bold">{n}</span><span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-1 text-gray-700 text-xs animate-bounce">
          <span>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-badge">Simple flow</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">From social post to WhatsApp sale</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Four steps is all it takes from someone seeing your product to messaging you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { n:'1', icon:'📱', color:'bg-blue-500',   title:'Share your link',     desc:'Post your Smart Pages store link on Instagram, TikTok, WhatsApp Status, or any platform.' },
              { n:'2', icon:'🛍️', color:'bg-purple-500', title:'Customer browses',    desc:'They land on a fast, beautiful mobile storefront — your brand, products, and colours.' },
              { n:'3', icon:'💬', color:'bg-[#25D366]',  title:'One tap to WhatsApp', desc:'A pre-filled message with product details and a unique INQ-xxxxx ID lands in your chat.' },
              { n:'4', icon:'💰', color:'bg-amber-500',  title:'You close the sale',  desc:'Reply, confirm, arrange payment — all in WhatsApp, the way you already work.' },
            ].map(({ n, icon, color, title, desc }) => (
              <div key={n} className="flex flex-col gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-white ${color}`}>{n}</div>
                <div>
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gray-950 border-y border-white/5 py-14 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['47+','Active merchants'],['98K','Monthly store views'],['12,840','WA clicks / month'],['25%','Avg conversion']].map(([n,l]) => (
            <div key={l} className="group">
              <p className="text-3xl md:text-4xl font-black text-white mb-1.5 group-hover:text-[#25D366] transition-colors">{n}</p>
              <p className="text-sm text-gray-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-badge">Why Smart Pages</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Built for merchants who sell on WhatsApp</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon:'🚀', title:'Live in 5 minutes',       desc:'Add products and go live. No coding, no complex setup, no IT team required.' },
              { icon:'💚', title:'WhatsApp-native',          desc:'Customers stay in WhatsApp. No new apps, no accounts, no friction to buying.' },
              { icon:'🆔', title:'Inquiry tracking IDs',     desc:'Every inquiry gets a unique INQ-xxxxx reference so you never lose a lead.' },
              { icon:'🎨', title:'Your brand, your colours', desc:'Fully branded storefronts with your logo, colours, and messaging.' },
              { icon:'📍', title:'Built for the region',     desc:'Designed for merchants in Sudan, Gulf, Egypt, UK diaspora, and beyond.' },
              { icon:'📱', title:'Mobile-first always',      desc:'Perfect on every phone — because that is where your customers are.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-3xl p-5
                                          shadow-card hover:shadow-card-md hover:-translate-y-0.5
                                          transition-all duration-200 card-hover">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WA CONCEPT ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20
                          flex items-center justify-center mx-auto mb-6">
            <WAIcon size={36} className="text-[#25D366]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            WhatsApp is already your CRM.
            <br/><span className="text-[#25D366]">We just send customers there.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
            Most merchants in our region already manage customer relationships on WhatsApp.
            Smart Pages plugs directly into that workflow — no new tools, no learning curve.
          </p>
          {/* WhatsApp message mockup */}
          <div className="bg-[#ECE5DD] rounded-3xl p-5 max-w-sm mx-auto text-left mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm">S</div>
              <div>
                <p className="text-xs font-bold text-gray-800">Sara Ahmed</p>
                <p className="text-2xs text-gray-500">Customer</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm text-xs text-gray-700 leading-relaxed space-y-0.5">
              <p>Hello! 👋 I&apos;m interested in ordering:</p>
              <p className="font-bold">*Khomra Face Mask — Traditional Sudanese*</p>
              <p>Price: £18.99</p>
              <p className="text-gray-400">Ref: INQ-M2X4-KHOMRA</p>
              <p className="text-gray-400">Seen on: smartpages.co/store/demo</p>
              <p className="mt-1">Please confirm availability. Thank you!</p>
              <p className="text-right text-gray-400 text-2xs mt-2">2:34 PM ✓✓</p>
            </div>
          </div>
          <Link href="/store/demo" className="btn-wa inline-flex text-base px-8">
            <WAIcon size={20}/> See the full demo →
          </Link>
        </div>
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-badge">Live demo</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">See a real merchant storefront</h2>
            <p className="text-gray-500 mt-3">AmaniRenas Beauty — Sudanese heritage products, shipped worldwide.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Phone mockup */}
            <div className="flex-shrink-0 w-60 mx-auto">
              <div className="bg-gray-900 rounded-[2.5rem] p-2.5 shadow-panel border border-gray-800">
                <div className="bg-white rounded-[2rem] overflow-hidden" style={{ height:'480px' }}>
                  <div className="h-28 bg-gradient-to-br from-[#7B3F00] to-[#3d1f00]
                                  flex flex-col justify-end px-4 pb-3 relative">
                    <div className="absolute bottom-0 left-0 right-0 h-5 bg-white rounded-t-2xl" />
                    <p className="text-white text-xs font-bold relative z-10">AmaniRenas Beauty</p>
                    <p className="text-white/60 text-2xs relative z-10">London, UK · ⭐ 4.9</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-3 mt-1">
                    {[['🌿','Khomra','£18.99'],['🛁','Dalka','£22.50'],['🌹','Bukhoor','£14.99'],['💫','Karkar','£16.00']].map(([e,n,p]) => (
                      <div key={n} className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                        <div className="aspect-square bg-white rounded-lg flex items-center justify-center text-2xl mb-1.5">{e}</div>
                        <p className="text-2xs font-semibold text-gray-900 truncate">{n}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-2xs font-black">{p}</span>
                          <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
                            <WAIcon size={9} className="text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Features list */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900 mb-4">A real storefront, ready in minutes</h3>
              <div className="flex flex-col gap-2.5 mb-8 text-sm text-gray-600">
                {['✅  Merchant-branded cover and logo','✅  Product grid with WhatsApp CTA on every card',
                  '✅  Category filters and full product detail pages','✅  Pre-filled WhatsApp messages with inquiry IDs',
                  '✅  Works perfectly on any mobile device'].map(t => <p key={t}>{t}</p>)}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/store/demo" className="btn-wa inline-flex text-sm px-6 py-3.5">
                  <WAIcon size={16}/> Open Demo Store
                </Link>
                <Link href="/dashboard"
                      className="inline-flex items-center gap-2 border border-gray-200 text-gray-700
                                 font-semibold text-sm px-6 py-3.5 rounded-2xl hover:border-gray-400 transition-colors">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gray-950 py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[500px] h-[300px] bg-[#25D366]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to sell through WhatsApp?</h2>
          <p className="text-gray-400 mb-10">Start with the free demo store. No account, no credit card, no setup.</p>
          <Link href="/store/demo" className="btn-wa inline-flex text-base px-10 py-4">
            <WAIcon size={20}/> View Demo Store
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
                <span className="text-white font-black text-xs">SP</span>
              </div>
              <span className="text-white font-bold">Smart Pages</span>
            </div>
            <p className="text-gray-600 text-xs max-w-xs leading-relaxed">
              WhatsApp-first social commerce for merchants in Sudan, the Gulf, and beyond.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[['Demo Store','/store/demo'],['Dashboard','/dashboard'],['Admin','/admin']].map(([l,h]) => (
              <Link key={l} href={h} className="text-sm text-gray-500 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <p className="text-gray-700 text-xs">Smart Pages LTD · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
