import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-container flex flex-col items-center justify-center
                    min-h-screen px-6 text-center bg-white">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-xl font-black text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-league-spartan)' }}>
        Page not found
      </h1>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        This store or page doesn&apos;t exist.<br />
        Check the link or go back to the platform.
      </p>
      <Link href="/"
            className="inline-flex items-center gap-2 px-5 py-3
                       bg-gray-900 text-white rounded-xl text-sm font-semibold">
        ← Back to Platform
      </Link>
    </div>
  )
}
