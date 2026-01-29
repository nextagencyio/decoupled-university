import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_EVENTS } from '@/lib/queries'
import { EventsData } from '@/lib/types'
import Header from '../components/Header'
import EventCard from '../components/EventCard'
import { Calendar } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Events | Decoupled University',
  description: 'Discover upcoming lectures, workshops, and campus events at Decoupled University.',
}

async function getEvents() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<EventsData>({
      query: GET_EVENTS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeEvents?.nodes || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  // Sort events by date (upcoming first)
  const now = Date.now() / 1000
  const sortedEvents = [...events].sort((a, b) => {
    const aDate = a.eventDate?.timestamp || 0
    const bDate = b.eventDate?.timestamp || 0
    return aDate - bDate
  })

  const upcomingEvents = sortedEvents.filter(e => (e.eventDate?.timestamp || 0) >= now)
  const pastEvents = sortedEvents.filter(e => (e.eventDate?.timestamp || 0) < now).reverse()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <Calendar className="w-8 h-8 text-blue-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Campus Events
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join us for lectures, workshops, performances, and more. There&apos;s always something happening at Decoupled University.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Events Yet</h2>
              <p className="text-gray-500">
                Events will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Upcoming Events
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500 font-medium">
                      {upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-400">
                      Past Events
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400 font-medium">
                      {pastEvents.length} event{pastEvents.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
