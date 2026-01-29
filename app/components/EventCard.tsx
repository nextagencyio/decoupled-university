import Link from 'next/link'
import { DrupalEvent } from '@/lib/types'
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface EventCardProps {
  event: DrupalEvent
  variant?: 'default' | 'horizontal'
}

function formatEventDate(timestamp: number): { month: string; day: string; weekday: string; time: string; fullDate: string } {
  const date = new Date(timestamp * 1000)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate().toString(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  const dateInfo = event.eventDate ? formatEventDate(event.eventDate.timestamp) : null
  const endDateInfo = event.endDate ? formatEventDate(event.endDate.timestamp) : null

  if (variant === 'horizontal') {
    return (
      <Link
        href={event.path || `/events/${event.id}`}
        className="group flex bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Date Badge */}
        {dateInfo && (
          <div className="flex-shrink-0 w-24 bg-purple-900 text-white flex flex-col items-center justify-center p-4">
            <span className="text-sm font-medium uppercase">{dateInfo.month}</span>
            <span className="text-3xl font-bold">{dateInfo.day}</span>
            <span className="text-xs text-purple-200">{dateInfo.weekday}</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6">
          {event.eventType && event.eventType.length > 0 && (
            <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold mb-2">
              {event.eventType[0].name}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {dateInfo && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {dateInfo.time}
                {endDateInfo && ` - ${endDateInfo.time}`}
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
      </Link>
    )
  }

  return (
    <Link
      href={event.path || `/events/${event.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image or Date Banner */}
      <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-700">
        {event.image?.url ? (
          <ResponsiveImage
            src={event.image.url}
            alt={event.image.alt || event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={event.image.variations}
            targetWidth={400}
          />
        ) : dateInfo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm font-medium uppercase tracking-wider">{dateInfo.month}</div>
              <div className="text-6xl font-bold">{dateInfo.day}</div>
              <div className="text-sm text-purple-200">{dateInfo.weekday}</div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Event Type Badge */}
        {event.eventType && event.eventType.length > 0 && (
          <div className="absolute top-4 left-4 bg-amber-500 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
            {event.eventType[0].name}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {event.body?.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.body.summary}
          </p>
        )}

        <div className="space-y-2 text-sm text-gray-500">
          {dateInfo && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {dateInfo.fullDate}
                {endDateInfo && dateInfo.fullDate !== endDateInfo.fullDate && ` - ${endDateInfo.fullDate}`}
              </span>
            </div>
          )}
          {dateInfo && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {dateInfo.time}
                {endDateInfo && ` - ${endDateInfo.time}`}
              </span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.registrationUrl && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="inline-flex items-center text-purple-700 font-medium text-sm">
              Register Now
              <ExternalLink className="w-4 h-4 ml-1" />
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
