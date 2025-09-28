"use client"
import React, {useEffect, useState} from 'react'

const CONSENT_KEY = 'ff_ads_consent'

function readConsent(): boolean | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === null) return null
    return v === '1'
  } catch {
    return null
  }
}

function writeConsent(value: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, value ? '1' : '0')
    // broadcast to other components
    window.dispatchEvent(new CustomEvent('ad-consent-changed', {detail: {consent: value}}))
  } catch {
    // noop
  }
}

export default function ConsentBanner() {
  const [consent, setConsent] = useState<boolean | null>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  if (hidden || consent === true) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-50">
      <div className="max-w-3xl mx-auto bg-white/95 text-black rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1">
          <strong>Ads & privacy</strong>
          <p className="text-sm text-neutral-700 mt-1">We use ads to support the project. Give permission to show contextual ads — no personalized tracking without consent.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-md bg-neutral-900 text-white text-sm" onClick={() => { writeConsent(true); setConsent(true); setHidden(true); }}>Allow ads</button>
          <button className="px-3 py-2 rounded-md bg-transparent border border-neutral-300 text-sm" onClick={() => { writeConsent(false); setConsent(false); setHidden(true); }}>Decline</button>
        </div>
      </div>
    </div>
  )
}
