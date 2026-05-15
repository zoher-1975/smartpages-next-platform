import type { MerchantSocial } from '@/lib/demo-data'

interface SocialLinksProps {
  social:    MerchantSocial
  variant?:  'row' | 'grid'
  className?: string
}

export function SocialLinks({ social, variant = 'row', className = '' }: SocialLinksProps) {
  const links = [
    social.instagram && { href: social.instagram, label: 'Instagram', emoji: '📸', color: 'text-pink-600'    },
    social.facebook  && { href: social.facebook,  label: 'Facebook',  emoji: '👥', color: 'text-blue-600'    },
    social.tiktok    && { href: social.tiktok,    label: 'TikTok',    emoji: '🎵', color: 'text-gray-900'    },
    social.telegram  && { href: social.telegram,  label: 'Telegram',  emoji: '✈️', color: 'text-sky-500'     },
    social.website   && { href: social.website,   label: 'Website',   emoji: '🌐', color: 'text-emerald-600' },
  ].filter(Boolean) as { href: string; label: string; emoji: string; color: string }[]

  if (!links.length) return null

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        {links.map(({ href, label, emoji, color }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center gap-1.5 py-3 rounded-2xl
                        bg-gray-50 border border-gray-100 hover:border-gray-200
                        transition-colors text-center">
            <span className="text-xl">{emoji}</span>
            <span className={`text-2xs font-bold ${color}`}>{label}</span>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {links.map(({ href, label, emoji }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700
                      transition-colors">
          <span>{emoji}</span>
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}
