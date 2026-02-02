export interface ConfigStatus {
  isConfigured: boolean
  missingVars: string[]
  allVars: string[]
  isDemoMode: boolean
}

export function checkConfiguration(): ConfigStatus {
  // Check if demo mode is enabled
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

  // In demo mode, we don't need Drupal environment variables
  if (isDemoMode) {
    return {
      isConfigured: true,
      missingVars: [],
      allVars: [],
      isDemoMode: true
    }
  }

  const requiredVars = [
    'NEXT_PUBLIC_DRUPAL_BASE_URL',
    'DRUPAL_CLIENT_ID',
    'DRUPAL_CLIENT_SECRET',
    'DRUPAL_REVALIDATE_SECRET'
  ]

  const missingVars = requiredVars.filter(varName => {
    const value = process.env[varName]
    return !value || value.includes('your-') || value === 'your-site.ddev.site'
  })

  return {
    isConfigured: missingVars.length === 0,
    missingVars,
    allVars: requiredVars,
    isDemoMode: false
  }
}