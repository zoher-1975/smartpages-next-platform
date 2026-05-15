'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Campaign, Merchant } from '@/lib/demo-data'
import { CampaignShareModal } from '@/components/ui/CampaignShareModal'

interface DashboardCampaignsProps {
  campaigns: Campaign[]
  merchant:  Merchant
}

const CAMP_STATUS: Record<string, { bg: string; text: string }> = {
  active:    { bg:'bg-green-100', text:'text-green-700' },
  scheduled: { bg:'bg-blue-100',  text:'text-blue-700'  },
  ended:     { bg:'bg-gray-100',  text:'text-gray-500'  },
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export function DashboardCampaigns({ campaigns, merchant }: DashboardCampaignsProps) {
  const [modalCampaign, setModalCampaign] = useState<Campaign | null>(null)

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card mb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="text-sm font-bold text-gray-900">Campaigns</h2>
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full">
            {campaigns.filter(c => c.status === 'active').length} active
          </span>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-50">
          {campaigns.map(c => {
            const cs = CAMP_STATUS[c.status]
            return (
              <div key={c.id} className="px-5 py-4">
                {/* Row: info + status + actions */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl mt-0.5 flex-shrink-0">{c.emoji ?? '📣'}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Ends {c.endDate}
                        {c.discount && ` · ${c.discount}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${cs.bg} ${cs.text}`}>
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Stats (if has data) */}
                {c.status !== 'scheduled' && (
                  <div className="flex gap-6 mb-3">
                    {[
                      { l:'Reach',       v: c.reach.toLocaleString()       },
                      { l:'Clicks',      v: c.clicks.toLocaleString()      },
                      { l:'Conversions', v: c.conversions.toLocaleString() },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <p className="text-base font-black text-gray-900">{v}</p>
                        <p className="text-2xs text-gray-400">{l}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Share / Publish */}
                  <button
                    onClick={() => setModalCampaign(c)}
                    className="flex items-center gap-1.5 bg-[#25D366]/8 border border-[#25D366]/25
                               text-[#25D366] text-xs font-bold px-3 py-1.5 rounded-xl
                               hover:bg-[#25D366]/15 transition-colors"
                  >
                    <ShareIcon />
                    Share / Publish
                  </button>

                  {/* View public catalog */}
                  <Link
                    href={`/store/demo/campaign/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-gray-50 border border-gray-200
                               text-gray-600 text-xs font-bold px-3 py-1.5 rounded-xl
                               hover:bg-gray-100 transition-colors"
                  >
                    <ExternalIcon />
                    View catalog
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Share modal */}
      {modalCampaign && (
        <CampaignShareModal
          campaign={modalCampaign}
          merchant={merchant}
          isOpen={true}
          onClose={() => setModalCampaign(null)}
          onTrack={(event) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log(`[Campaign Share] ${event}`, modalCampaign.id)
            }
          }}
        />
      )}
    </>
  )
}
