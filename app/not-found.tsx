import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center
                    px-6 text-center">
      <p className="text-6xl mb-5">🔍</p>
      <h1 className="text-2xl font-black text-white mb-2">Page not found</h1>
      <p className="text-sm text-gray-400 mb-10 leading-relaxed max-w-xs">
        This page doesn&apos;t exist. Head back to the platform or try the demo store.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href="/store/demo"
              className="flex items-center justify-center gap-2
                         bg-[#25D366] text-white font-bold py-4 rounded-2xl
                         hover:bg-[#1da851] transition-colors
                         shadow-[0_4px_16px_rgba(37,211,102,0.35)]">
          View Demo Store
        </Link>
        <Link href="/"
              className="flex items-center justify-center
                         bg-white/8 border border-white/12 text-white
                         font-semibold py-4 rounded-2xl
                         hover:bg-white/12 transition-colors">
          ← Platform Home
        </Link>
      </div>
    </div>
  )
}
