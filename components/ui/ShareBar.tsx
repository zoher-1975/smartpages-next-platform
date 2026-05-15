'use client'

import { useState } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────────
function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function FBIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function TGIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ShareBarProps {
  waUrl:       string    // pre-built wa.me share URL (no product order, just share)
  fbUrl:       string    // facebook sharer URL
  tgUrl:       string    // telegram share URL
  copyUrl:     string    // the canonical page URL to copy
  variant?:    'row' | 'compact'
  onTrack?:    (event: string) => void
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ShareBar({
  waUrl, fbUrl, tgUrl, copyUrl,
  variant = 'row',
  onTrack,
}: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyUrl)
      setCopied(true)
      onTrack?.('copied_link')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for iOS Safari
      const el = document.createElement('input')
      el.value = copyUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      onTrack?.('copied_link')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
           onClick={() => onTrack?.('shared_to_whatsapp')}
           className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center
                      hover:bg-[#1da851] transition-colors shadow-sm"
           aria-label="Share via WhatsApp">
          <WAIcon size={14} />
        </a>
        <a href={fbUrl} target="_blank" rel="noopener noreferrer"
           onClick={() => onTrack?.('shared_to_facebook')}
           className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center
                      hover:bg-[#166FE5] transition-colors shadow-sm"
           aria-label="Share on Facebook">
          <FBIcon size={13} />
        </a>
        <a href={tgUrl} target="_blank" rel="noopener noreferrer"
           onClick={() => onTrack?.('shared_to_telegram')}
           className="w-8 h-8 rounded-full bg-[#2AABEE] text-white flex items-center justify-center
                      hover:bg-[#229ED9] transition-colors shadow-sm"
           aria-label="Share on Telegram">
          <TGIcon size={13} />
        </a>
        <button onClick={handleCopy}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center
                           hover:bg-gray-200 transition-colors shadow-sm"
                aria-label="Copy link">
          {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2.5">
      {/* WhatsApp */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
         onClick={() => onTrack?.('shared_to_whatsapp')}
         className="flex-1 flex items-center justify-center gap-2
                    bg-[#25D366] text-white text-xs font-bold
                    py-2.5 rounded-xl hover:bg-[#1da851] transition-colors
                    shadow-[0_2px_8px_rgba(37,211,102,0.3)]">
        <WAIcon size={14} />
        WhatsApp
      </a>

      {/* Facebook */}
      <a href={fbUrl} target="_blank" rel="noopener noreferrer"
         onClick={() => onTrack?.('shared_to_facebook')}
         className="flex-1 flex items-center justify-center gap-2
                    bg-[#1877F2] text-white text-xs font-bold
                    py-2.5 rounded-xl hover:bg-[#166FE5] transition-colors">
        <FBIcon size={13} />
        Facebook
      </a>

      {/* Telegram */}
      <a href={tgUrl} target="_blank" rel="noopener noreferrer"
         onClick={() => onTrack?.('shared_to_telegram')}
         className="flex-1 flex items-center justify-center gap-2
                    bg-[#2AABEE] text-white text-xs font-bold
                    py-2.5 rounded-xl hover:bg-[#229ED9] transition-colors">
        <TGIcon size={13} />
        Telegram
      </a>

      {/* Copy link */}
      <button onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2
                         bg-gray-100 text-gray-700 text-xs font-bold
                         py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
        {copied ? <><CheckIcon size={13} />Copied!</> : <><CopyIcon size={13} />Copy link</>}
      </button>
    </div>
  )
}
