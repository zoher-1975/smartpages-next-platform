'use client'

import { useState, useEffect } from 'react'
import type { Campaign, Merchant } from '@/lib/demo-data'
import {
  buildCampaignShareWA,
  buildFacebookShareUrl,
  buildTelegramShareUrl,
} from '@/lib/demo-data'

// ── Icons ──────────────────────────────────────────────────────────────────────
function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function FBIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function TGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function IGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

interface CampaignShareModalProps {
  campaign:  Campaign
  merchant:  Merchant
  isOpen:    boolean
  onClose:   () => void
  onTrack?:  (event: string) => void
}

export function CampaignShareModal({
  campaign, merchant, isOpen, onClose, onTrack,
}: CampaignShareModalProps) {
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [copiedLink,    setCopiedLink]    = useState(false)

  const pageUrl = campaign.shareUrl
    ?? `${typeof window !== 'undefined' ? window.location.origin : ''}/store/${merchant.slug}`

  const caption  = campaign.caption ?? `${campaign.emoji ?? '✨'} ${campaign.name} — ${merchant.name}\n\n${pageUrl}`
  const waUrl    = buildCampaignShareWA(merchant, campaign, pageUrl)
  const fbUrl    = buildFacebookShareUrl(pageUrl)
  const tgUrl    = buildTelegramShareUrl(`${campaign.emoji ?? '✨'} ${campaign.name} — ${merchant.name}`, pageUrl)

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  async function copyText(text: string, type: 'caption' | 'link') {
    try { await navigator.clipboard.writeText(text) }
    catch { /* fallback handled silently */ }
    if (type === 'caption') {
      setCopiedCaption(true)
      onTrack?.('copied_instagram_caption')
      setTimeout(() => setCopiedCaption(false), 2500)
    } else {
      setCopiedLink(true)
      onTrack?.('copied_link')
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 bg-black/60 backdrop-blur-sm animate-fade-in p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal panel */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-panel overflow-hidden
                      animate-slide-up max-h-[90dvh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Share campaign</p>
            <h2 className="text-sm font-bold text-gray-900">{campaign.name}</h2>
          </div>
          <button onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                             hover:bg-gray-200 transition-colors text-gray-500"
                  aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">

          {/* Campaign preview card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            <div className="h-24 flex items-center justify-center text-5xl"
                 style={{ background: `linear-gradient(135deg, ${merchant.coverColor} 0%, #1f0f00 100%)` }}>
              {campaign.emoji ?? '✨'}
            </div>
            <div className="bg-white px-4 py-3">
              <p className="font-bold text-sm text-gray-900">{campaign.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {merchant.name} · Ends {campaign.endDate}
                {campaign.discount && ` · ${campaign.discount}`}
              </p>
            </div>
          </div>

          {/* Campaign link */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Campaign link
            </p>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200
                            rounded-xl px-3 py-2.5">
              <span className="flex-1 text-xs text-gray-600 truncate font-mono">
                {pageUrl}
              </span>
              <button onClick={() => copyText(pageUrl, 'link')}
                      className="flex-shrink-0 flex items-center gap-1 text-xs font-bold
                                 text-[#25D366] hover:text-[#1da851] transition-colors">
                <CopyIcon />
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Share buttons */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Share to
            </p>
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => onTrack?.('shared_to_whatsapp')}
                 className="flex flex-col items-center gap-2 bg-[#25D366]/8 border border-[#25D366]/20
                            text-[#25D366] text-xs font-bold py-3 rounded-2xl
                            hover:bg-[#25D366]/15 transition-colors">
                <WAIcon />
                WhatsApp
              </a>

              {/* Facebook */}
              <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => onTrack?.('shared_to_facebook')}
                 className="flex flex-col items-center gap-2 bg-[#1877F2]/8 border border-[#1877F2]/20
                            text-[#1877F2] text-xs font-bold py-3 rounded-2xl
                            hover:bg-[#1877F2]/15 transition-colors">
                <FBIcon />
                Facebook
              </a>

              {/* Telegram */}
              <a href={tgUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => onTrack?.('shared_to_telegram')}
                 className="flex flex-col items-center gap-2 bg-[#2AABEE]/8 border border-[#2AABEE]/20
                            text-[#2AABEE] text-xs font-bold py-3 rounded-2xl
                            hover:bg-[#2AABEE]/15 transition-colors">
                <TGIcon />
                Telegram
              </a>
            </div>
          </div>

          {/* Instagram caption */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Instagram / caption
              </p>
              <button onClick={() => copyText(caption, 'caption')}
                      className="flex items-center gap-1 text-xs font-bold text-purple-600
                                 hover:text-purple-800 transition-colors">
                <IGIcon />
                {copiedCaption ? 'Copied!' : 'Copy caption'}
              </button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3
                            text-xs text-gray-600 leading-relaxed whitespace-pre-line
                            max-h-32 overflow-y-auto font-mono">
              {caption}
            </div>
          </div>

          {/* Download placeholder */}
          <button onClick={() => onTrack?.('downloaded_campaign_card')}
                  className="flex items-center justify-center gap-2
                             w-full py-3 rounded-2xl border-2 border-dashed border-gray-200
                             text-gray-400 text-xs font-semibold
                             hover:border-gray-300 hover:text-gray-500 transition-colors">
            <DownloadIcon />
            Download campaign image (Phase 2)
          </button>

        </div>
      </div>
    </div>
  )
}
