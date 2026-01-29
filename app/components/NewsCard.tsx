import Link from 'next/link'
import { DrupalNews } from '@/lib/types'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface NewsCardProps {
  news: DrupalNews
  featured?: boolean
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <Link
        href={news.path || `/news/${news.id}`}
        className="group relative rounded-xl overflow-hidden h-full min-h-[400px] shadow-lg"
      >
        {news.image?.url ? (
          <ResponsiveImage
            src={news.image.url}
            alt={news.image.alt || news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={news.image.variations}
            targetWidth={800}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <Newspaper className="w-24 h-24 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {news.category && news.category.length > 0 && (
            <span className="inline-block bg-amber-500 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {news.category[0].name}
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
            {news.title}
          </h3>
          {news.body?.summary && (
            <p className="text-white/80 mb-4 line-clamp-2">{news.body.summary}</p>
          )}
          <div className="flex items-center text-white/60 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(news.created.timestamp)}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={news.path || `/news/${news.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {news.image?.url ? (
          <ResponsiveImage
            src={news.image.url}
            alt={news.image.alt || news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={news.image.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
            <Newspaper className="w-12 h-12 text-white/30" />
          </div>
        )}
        {news.featured && (
          <div className="absolute top-4 right-4 bg-amber-500 text-blue-900 px-2 py-1 rounded text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        {news.category && news.category.length > 0 && (
          <span className="inline-block text-blue-600 text-sm font-medium mb-2">
            {news.category[0].name}
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {news.title}
        </h3>

        {news.body?.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {news.body.summary}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(news.created.timestamp)}
          </div>
          <span className="flex items-center text-blue-600 font-medium group-hover:gap-1 transition-all">
            Read more
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
