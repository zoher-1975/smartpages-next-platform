import Link from 'next/link'

interface NavItem {
  label: string
  href:  string
  icon:  string
  badge?: number
}

interface DashboardSidebarProps {
  title:    string
  items:    NavItem[]
  active?:  string
  variant?: 'merchant' | 'admin'
}

export function DashboardSidebar({ title, items, active, variant = 'merchant' }: DashboardSidebarProps) {
  const isAdmin   = variant === 'admin'
  const bgColor   = isAdmin ? 'bg-gray-950' : 'bg-white'
  const textColor = isAdmin ? 'text-white'   : 'text-gray-900'
  const mutedText = isAdmin ? 'text-gray-500' : 'text-gray-400'
  const borderClr = isAdmin ? 'border-white/5' : 'border-gray-100'
  const hoverBg   = isAdmin ? 'hover:bg-white/5' : 'hover:bg-gray-50'
  const activeBg  = isAdmin ? 'bg-white/10 text-white' : 'bg-[#25D366]/8 text-[#25D366]'

  return (
    <aside className={`hidden md:flex flex-col w-56 flex-shrink-0
                       ${bgColor} border-r ${borderClr} min-h-screen
                       fixed top-0 left-0`}>

      {/* Logo */}
      <div className={`px-5 py-5 border-b ${borderClr}`}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
            <span className="text-white font-black text-xs">SP</span>
          </div>
          <span className={`font-bold text-sm ${textColor}`}>Smart Pages</span>
        </Link>
        <p className={`text-xs ${mutedText} mt-1`}>{title}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {items.map(({ label, href, icon, badge }) => {
          const isActive = active === label
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                          font-medium transition-all duration-150
                          ${isActive ? activeBg : `${mutedText} ${hoverBg}`}`}
            >
              <span className="text-base">{icon}</span>
              <span className="flex-1">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold
                                 min-w-[18px] h-[18px] rounded-full
                                 flex items-center justify-center px-1">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={`px-5 py-4 border-t ${borderClr}`}>
        <Link href="/" className={`text-xs ${mutedText} hover:text-white transition-colors`}>
          ← Back to Platform
        </Link>
      </div>
    </aside>
  )
}
