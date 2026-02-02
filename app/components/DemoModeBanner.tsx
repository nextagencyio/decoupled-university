'use client'

/**
 * Demo Mode Banner Component
 *
 * DELETE THIS FILE when removing demo mode from a real project.
 * Also remove the <DemoModeBanner /> from app/layout.tsx
 */

import { AlertTriangle, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if demo mode is enabled
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
    setIsVisible(demoMode)

    // Check if user dismissed the banner in this session
    const dismissed = sessionStorage.getItem('demo-banner-dismissed')
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem('demo-banner-dismissed', 'true')
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="bg-amber-500 text-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>
              <strong>Demo Mode:</strong> This site is running with sample data. No Drupal backend is connected.
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-amber-600/20 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
