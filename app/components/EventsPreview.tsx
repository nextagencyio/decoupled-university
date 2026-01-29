'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_UPCOMING_EVENTS } from '@/lib/queries'
import { DrupalEvent } from '@/lib/types'
import { MapPin, ArrowRight, Calendar } from 'lucide-react'

interface UpcomingEventsData {
  nodeEvents: {
    nodes: DrupalEvent[]
  }
}

function formatEventDate(timestamp: number): { month: string; day: string; time: string } {
  const date = new Date(timestamp * 1000)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate().toString(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

export default function EventsPreview() {
  const { data, loading, error } = useQuery<UpcomingEventsData>(GET_UPCOMING_EVENTS)

  const events = data?.nodeEvents?.nodes || []

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 animate-pulse">
                <div className="h-12 w-12 bg-white/20 rounded mb-4" />
                <div className="h-6 bg-white/20 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || events.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-purple-200 max-w-2xl">
              Join us for lectures, workshops, and campus activities.
            </p>
          </div>
          <Link
            href="/events"
            className="hidden md:flex items-center text-amber-400 hover:text-amber-300 font-medium"
          >
            All Events
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const dateInfo = event.eventDate
              ? formatEventDate(event.eventDate.timestamp)
              : null

            return (
              <Link
                key={event.id}
                href={event.path || `/events/${event.id}`}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex gap-4">
                  {dateInfo && (
                    <div className="flex-shrink-0 text-center bg-amber-500 text-purple-900 rounded-lg p-3 w-16">
                      <div className="text-xs font-semibold uppercase">{dateInfo.month}</div>
                      <div className="text-2xl font-bold">{dateInfo.day}</div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {event.eventType && event.eventType.length > 0 && (
                      <span className="inline-block text-amber-400 text-sm font-medium mb-1">
                        {event.eventType[0].name}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-purple-200">
                      {dateInfo && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {dateInfo.time}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors font-bold"
          >
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
