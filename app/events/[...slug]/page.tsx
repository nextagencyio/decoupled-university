import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_EVENT_BY_PATH } from '@/lib/queries'
import { DrupalEvent } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface EventByPathData {
  route: {
    entity: DrupalEvent
  } | null
}

async function getEvent(path: string): Promise<DrupalEvent | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<EventByPathData>({
      query: GET_EVENT_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

function formatEventDate(timestamp: number): { date: string; time: string; weekday: string } {
  const d = new Date(timestamp * 1000)
  return {
    date: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/events/${slug.join('/')}`
  const event = await getEvent(path)

  if (!event) {
    return {
      title: 'Event Not Found | Decoupled University',
    }
  }

  return {
    title: `${event.title} | Events | Decoupled University`,
    description: event.body?.summary || `Join us for ${event.title} at Decoupled University.`,
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/events/${slug.join('/')}`
  const event = await getEvent(path)

  if (!event) {
    notFound()
  }

  const startDate = event.eventDate ? formatEventDate(event.eventDate.timestamp) : null
  const endDate = event.endDate ? formatEventDate(event.endDate.timestamp) : null
  const isPast = event.eventDate && event.eventDate.timestamp * 1000 < Date.now()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        {event.image?.url && (
          <div className="absolute inset-0 opacity-30">
            <ResponsiveImage
              src={event.image.url}
              alt=""
              fill
              className="object-cover"
              variations={event.image.variations}
              targetWidth={1200}
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/events"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>

          <div className="max-w-3xl">
            {event.eventType && event.eventType.length > 0 && (
              <span className="inline-block bg-amber-500 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                {event.eventType[0].name}
              </span>
            )}
            {isPast && (
              <span className="inline-block bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 ml-2">
                Past Event
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {event.title}
            </h1>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {startDate && (
                <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">{startDate.weekday}</div>
                    <div className="text-purple-200">{startDate.date}</div>
                    {endDate && startDate.date !== endDate.date && (
                      <div className="text-purple-200">to {endDate.date}</div>
                    )}
                  </div>
                </div>
              )}
              {startDate && (
                <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Time</div>
                    <div className="text-purple-200">
                      {startDate.time}
                      {endDate && ` - ${endDate.time}`}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {event.location && (
              <div className="flex items-center gap-3 text-purple-100">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.image?.url && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                  <ResponsiveImage
                    src={event.image.url}
                    alt={event.image.alt || event.title}
                    fill
                    className="object-cover"
                    variations={event.image.variations}
                    targetWidth={800}
                  />
                </div>
              )}

              {event.body?.processed && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.body.processed }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Event Information</h3>

                <dl className="space-y-4 mb-6">
                  {event.eventType && event.eventType.length > 0 && (
                    <div>
                      <dt className="text-sm text-gray-500">Event Type</dt>
                      <dd className="font-semibold text-gray-900">{event.eventType[0].name}</dd>
                    </div>
                  )}
                  {startDate && (
                    <div>
                      <dt className="text-sm text-gray-500">Date</dt>
                      <dd className="font-semibold text-gray-900">{startDate.date}</dd>
                    </div>
                  )}
                  {startDate && (
                    <div>
                      <dt className="text-sm text-gray-500">Time</dt>
                      <dd className="font-semibold text-gray-900">
                        {startDate.time}
                        {endDate && ` - ${endDate.time}`}
                      </dd>
                    </div>
                  )}
                  {event.location && (
                    <div>
                      <dt className="text-sm text-gray-500">Location</dt>
                      <dd className="font-semibold text-gray-900">{event.location}</dd>
                    </div>
                  )}
                </dl>

                {event.registrationUrl && !isPast && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-3 bg-amber-500 text-purple-900 rounded-lg font-bold hover:bg-amber-400 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}

                {isPast && (
                  <div className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg">
                    This event has ended
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    href="/events"
                    className="text-purple-700 hover:text-purple-700 font-medium text-sm flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    View all events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
