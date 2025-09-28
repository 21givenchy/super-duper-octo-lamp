"use client"
import React, {useEffect, useState} from 'react'

type AdSlotProps = {
  id?: string
  label?: string
  /** Minimum number of characters of page content required before showing ads */
  minContentLength?: number
  /** Force showing the ad (admin override) */
  forceShow?: boolean
}

export default function AdSlot({
  id = 'ad-default',
  label = 'Sponsored',
  minContentLength = 300,
  forceShow = false,
}: AdSlotProps) {
  // SSR-safe placeholder: we avoid loading third-party ad scripts on the server.
  // Client-side, we only enable the ad slot when there's sufficient publisher content
  // on the page (to comply with AdSense policy about "screens without publisher-content").
  const [canShow, setCanShow] = useState(false)

  useEffect(() => {
    if (forceShow) {
      setCanShow(true)
      return
    }

    // track consent state (read from localStorage if present)
    const readConsent = () => {
      try {
        const v = window.localStorage.getItem('ff_ads_consent')
        return v === '1'
      } catch {
        return null
      }
    }

    const consentState = readConsent()
    if (consentState === false) {
      // explicit deny: never show
      setCanShow(false)
      return
    }

    const checkContent = () => {
      try {
        // Prefer an explicit page marker if available, otherwise fall back to body text length.
        const contentElem = document.querySelector('[data-content-rich]') || document.body
        const text = (contentElem && (contentElem.textContent || '')) || ''
        if (text.trim().length >= (minContentLength || 0)) {
          setCanShow(true)
        }
      } catch {
        // If anything goes wrong, keep the ad hidden to be safe.
        console.warn('AdSlot content check failed')
      }
    }

    // run immediately and after a short delay (to allow hydration/injected content)
    checkContent()
    const t = window.setTimeout(checkContent, 600)

    const onConsent = (e: Event) => {
      try {
        // @ts-expect-error - event may have a detail property set by our custom event
        const detail = e?.detail || {}
        const val = detail?.consent
        if (val === true) {
          checkContent()
        } else if (val === false) {
          setCanShow(false)
        }
      } catch {
        // noop
      }
    }

    window.addEventListener('ad-consent-changed', onConsent)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('ad-consent-changed', onConsent)
    }
  }, [minContentLength, forceShow])

  if (!canShow) {
    return (
      <div aria-label={`ad-slot-${id}`} className="border border-neutral-200 p-3 rounded-md bg-neutral-50">
        <small className="block text-sm text-neutral-600 mb-2">{label}</small>
        <div className="min-h-20 flex items-center justify-center">
          <span className="text-neutral-500">Ad hidden: page content is too light or under construction. Ads load only on content-rich pages.</span>
        </div>
      </div>
    )
  }

  // Placeholder area where an iframe or ad script would be safely injected after consent.
  // Important: do NOT place third-party ad scripts directly here without consent and sandboxing.
  return (
    <div aria-label={`ad-slot-${id}`} className="border border-neutral-200 p-3 rounded-md bg-white">
      <small className="block text-sm text-neutral-600 mb-2">{label}</small>
      <div className="min-h-[120px] flex items-center justify-center">
        <span className="text-neutral-700">Ad-ready slot — load advertiser creative here after consent and sandboxing.</span>
      </div>
    </div>
  )
}
