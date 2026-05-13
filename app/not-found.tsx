import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center
                    px-6 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-black text-white mb-2">Page not found</h1>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-xs">
        This page doesn&apos;t exist. Check the URL or go back to the platform.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href="/"
              className="flex items-center justify-center gap-2
                         bg-white text-gray-900 font-bold
                         py-3.5 rounded-xl hover:bg-gray-100 transition-colors">
          ← Platform Home
        </Link>
        <Link href="/store/demo"
              className="flex items-center justify-center gap-2
                         bg-[#25D366] text-white font-bold
                         py-3.5 rounded-xl hover:bg-[#1da851] transition-colors">
          View Demo Store
        </Link>
      </div>
    </div>
  )
}
