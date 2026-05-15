'use client'

import { ShareBar } from './ShareBar'

interface ShareBarClientProps {
  waUrl:        string
  fbUrl:        string
  tgUrl:        string
  copyUrl:      string
  eventPrefix?: string
}

export function ShareBarClient({
  waUrl, fbUrl, tgUrl, copyUrl, eventPrefix = 'page',
}: ShareBarClientProps) {
  function track(event: string) {
    // Phase 2: POST to analytics API
    // For now: console only in dev
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Share] ${eventPrefix}_${event}`)
    }
  }

  return (
    <ShareBar
      waUrl={waUrl}
      fbUrl={fbUrl}
      tgUrl={tgUrl}
      copyUrl={copyUrl}
      onTrack={track}
    />
  )
}
