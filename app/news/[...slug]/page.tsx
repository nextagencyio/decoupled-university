import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_NEWS_BY_PATH } from '@/lib/queries'
import { DrupalNews } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface NewsByPathData {
  route: {
    entity: DrupalNews
  } | null
}

async function getNewsArticle(path: string): Promise<DrupalNews | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<NewsByPathData>({
      query: GET_NEWS_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching news:', error)
    return null
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/news/${slug.join('/')}`
  const news = await getNewsArticle(path)

  if (!news) {
    return {
      title: 'Article Not Found | Decoupled University',
    }
  }

  return {
    title: `${news.title} | News | Decoupled University`,
    description: news.body?.summary || `Read about ${news.title} at Decoupled University.`,
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const path = `/news/${slug.join('/')}`
  const news = await getNewsArticle(path)

  if (!news) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        {news.image?.url && (
          <div className="absolute inset-0 opacity-30">
            <ResponsiveImage
              src={news.image.url}
              alt=""
              fill
              className="object-cover"
              variations={news.image.variations}
              targetWidth={1200}
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/news"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            {news.category && news.category.length > 0 && (
              <span className="inline-flex items-center bg-amber-500 text-purple-900 px-4 py-2 rounded-full text-sm font-bold">
                <Tag className="w-4 h-4 mr-2" />
                {news.category[0].name}
              </span>
            )}
            {news.featured && (
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Featured Story
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {news.title}
          </h1>

          <div className="flex items-center text-purple-200">
            <Calendar className="w-5 h-5 mr-2" />
            {formatDate(news.created.timestamp)}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {news.image?.url && (
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
              <ResponsiveImage
                src={news.image.url}
                alt={news.image.alt || news.title}
                fill
                className="object-cover"
                variations={news.image.variations}
                targetWidth={800}
              />
            </div>
          )}

          {/* Article Body */}
          {news.body?.processed && (
            <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-purple-700"
                dangerouslySetInnerHTML={{ __html: news.body.processed }}
              />
            </article>
          )}

          {/* Footer / Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/news"
                className="text-purple-700 hover:text-purple-700 font-medium flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                More News
              </Link>

              {news.category && news.category.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Category:</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {news.category[0].name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
