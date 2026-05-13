import type { Metadata } from 'next'
import Link from 'next/link'
import { PlatformHeader } from '@/components/platform/PlatformHeader'
import { HeroSection } from '@/components/platform/HeroSection'
import { SectionContainer, SectionHeading } from '@/components/ui/SectionContainer'

export const metadata: Metadata = {
  title:       'Smart Pages — WhatsApp-First Social Commerce',
  description: 'Turn social media traffic into WhatsApp sales. Mobile storefronts that convert.',
}

function Step({ n, icon, title, desc }: { n: string; icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 md:flex-col md:gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25D366]/10
                      border border-[#25D366]/20 flex items-center justify-center
                      text-[#25D366] font-black text-sm">
        {n}
      </div>
      <div>
        <p className="text-2xl mb-2">{icon}</p>
        <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <PlatformHeader transparent />
      <HeroSection />

      {/* How It Works */}
      <SectionContainer id="how-it-works" className="bg-white">
        <SectionHeading
          badge="Simple flow"
          title="From social post to WhatsApp sale"
          subtitle="Four steps — that is all it takes from someone seeing your product to landing in your WhatsApp chat."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          <Step n="1" icon="📱" title="Share your link"
            desc="Post your Smart Pages store link on Instagram, TikTok, WhatsApp status, or any social platform." />
          <Step n="2" icon="🛍️" title="Customer browses"
            desc="They see a beautiful mobile storefront with your products, prices, and details." />
          <Step n="3" icon="💬" title="One tap to WhatsApp"
            desc="They tap the button. A pre-filled message with product details lands in your chat." />
          <Step n="4" icon="💰" title="You close the sale"
            desc="Reply, confirm, arrange payment — all in WhatsApp, the way you already do business." />
        </div>
      </SectionContainer>

      {/* Stats bar */}
      <section className="bg-gray-950 py-14">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '47+',    label: 'Active merchants' },
            { n: '98K',    label: 'Monthly store views' },
            { n: '12,840', label: 'WhatsApp clicks / mo' },
            { n: '25%',    label: 'Avg conversion rate' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{n}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <SectionContainer className="bg-gray-50">
        <SectionHeading
          badge="Why Smart Pages"
          title="Built for merchants who sell on WhatsApp"
          subtitle="No complicated software. Just a storefront that sends customers to your WhatsApp."
          center
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: '🚀', title: 'Live in 5 minutes',        desc: 'Add products and go live. No coding, no setup complexity.' },
            { icon: '💚', title: 'WhatsApp-native',           desc: 'Customers stay in WhatsApp. No new apps required.' },
            { icon: '📊', title: 'Inquiry tracking IDs',      desc: 'Every inquiry gets a unique ID so you never lose a lead.' },
            { icon: '🎨', title: 'Your brand, your colours',  desc: 'Fully branded storefronts matching your visual identity.' },
            { icon: '📍', title: 'Built for the region',      desc: 'Designed for merchants in Sudan, Gulf, Egypt, and beyond.' },
            { icon: '📱', title: 'Mobile-first always',       desc: 'Perfect on every phone — where your customers actually are.' },
          ].map(b => <BenefitCard key={b.title} {...b} />)}
        </div>
      </SectionContainer>

      {/* WhatsApp-first callout */}
      <SectionContainer className="bg-[#25D366]/5 border-y border-[#25D366]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-5xl mb-5">💬</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            WhatsApp is already your CRM.
            <br />
            <span className="text-[#25D366]">We just send customers there.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
            Most merchants already manage customer relationships on WhatsApp.
            Smart Pages plugs directly into that workflow — no new tools, no learning curve.
          </p>
          <Link href="/store/demo"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white
                           font-bold px-8 py-3.5 rounded-xl hover:bg-[#1da851] transition-colors">
            See it in action →
          </Link>
        </div>
      </SectionContainer>

      {/* Demo preview */}
      <SectionContainer className="bg-white">
        <SectionHeading badge="Live demo" title="See a real merchant storefront"
          subtitle="AmaniRenas Beauty — a demo store with the full Smart Pages experience." center />
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B3F00] to-[#5c2e00]
                          flex items-center justify-center mx-auto mb-4 text-3xl">✨</div>
          <h3 className="text-xl font-black text-gray-900 mb-1">AmaniRenas Beauty</h3>
          <p className="text-sm text-gray-500 mb-6">Authentic Sudanese beauty · London, UK</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {['🌿','🛁','🌹','💫','🌾','🎁'].map((e, i) => (
              <div key={i} className="aspect-square bg-white rounded-xl border border-gray-100
                                      flex items-center justify-center text-2xl shadow-sm">{e}</div>
            ))}
          </div>
          <Link href="/store/demo"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white
                           font-bold py-3.5 rounded-xl hover:bg-[#1da851] transition-colors w-full">
            Open Demo Store
          </Link>
        </div>
      </SectionContainer>

      {/* Final CTA */}
      <section className="bg-gray-950 py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Ready to sell through WhatsApp?
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Start with a free demo store. No sign-up required.
        </p>
        <Link href="/store/demo"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white
                         font-bold text-lg px-10 py-4 rounded-2xl
                         hover:bg-[#1da851] transition-colors">
          View Demo Store →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#25D366] flex items-center justify-center">
              <span className="text-white font-black text-xs">SP</span>
            </div>
            <span className="text-gray-400 text-sm">Smart Pages LTD</span>
          </div>
          <div className="flex items-center gap-6">
            {[['Demo Store', '/store/demo'], ['Dashboard', '/dashboard'], ['Admin', '/admin']].map(([l, h]) => (
              <Link key={l} href={h} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{l}</Link>
            ))}
          </div>
          <p className="text-xs text-gray-600">Phase 1 · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}
