/**
 * Demo Mode Module
 *
 * This file contains ALL demo/mock mode functionality.
 * To remove demo mode from a real project:
 * 1. Delete this file (lib/demo-mode.ts)
 * 2. Delete the data/mock/ directory
 * 3. Delete app/components/DemoModeBanner.tsx
 * 4. Remove DemoModeBanner from app/layout.tsx
 * 5. Remove the demo mode check from app/api/graphql/route.ts (just the isDemoMode() call)
 */

// Import mock data for serverless compatibility
import homepageData from '@/data/mock/homepage.json'
import programsData from '@/data/mock/programs.json'
import facultyData from '@/data/mock/faculty.json'
import eventsData from '@/data/mock/events.json'
import newsData from '@/data/mock/news.json'
import routesData from '@/data/mock/routes.json'

/**
 * Check if demo mode is enabled via environment variable
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}

// Mock data map for query lookup
const mockDataMap: Record<string, any> = {
  'homepage.json': homepageData,
  'programs.json': programsData,
  'faculty.json': facultyData,
  'events.json': eventsData,
  'news.json': newsData,
  'routes.json': routesData,
}

function loadMockData(filename: string): any {
  return mockDataMap[filename] || null
}

/**
 * Handle a GraphQL query with mock data
 * Returns the appropriate mock response based on the query
 */
export function handleMockQuery(body: string): any {
  try {
    const { query, variables } = JSON.parse(body)

    // Handle route queries FIRST (for individual detail pages)
    // This must come before listing queries to avoid false matches
    if (variables?.path) {
      const routePath = variables.path
      const routes = loadMockData('routes.json')
      if (routes && routes[routePath]) {
        return routes[routePath]
      }
    }

    // Determine which mock data to return based on the query
    if (query.includes('GetHomepageData') || query.includes('nodeHomepages')) {
      return loadMockData('homepage.json')
    }

    if (query.includes('GetPrograms') || (query.includes('nodePrograms') && !query.includes('route'))) {
      return loadMockData('programs.json')
    }

    if (query.includes('GetFeaturedPrograms')) {
      const programs = JSON.parse(JSON.stringify(loadMockData('programs.json')))
      if (programs?.data?.nodePrograms?.nodes) {
        programs.data.nodePrograms.nodes = programs.data.nodePrograms.nodes.slice(0, 3)
      }
      return programs
    }

    if (query.includes('GetFaculty') || query.includes('nodeFaculties')) {
      return loadMockData('faculty.json')
    }

    if (query.includes('GetEvents') || query.includes('GetUpcomingEvents') || query.includes('nodeEvents')) {
      return loadMockData('events.json')
    }

    if (query.includes('GetNews') || query.includes('GetFeaturedNews') || query.includes('nodeNewsItems')) {
      return loadMockData('news.json')
    }

    // Return empty data for unmatched queries
    return { data: {} }
  } catch (error) {
    console.error('Mock query error:', error)
    return { data: {}, errors: [{ message: 'Mock data error' }] }
  }
}
