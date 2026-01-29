import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_NEWS } from '@/lib/queries'
import { NewsData } from '@/lib/types'
import Header from '../components/Header'
import NewsCard from '../components/NewsCard'
import { Newspaper } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'News | Decoupled University',
  description: 'Stay updated with the latest news and announcements from Decoupled University.',
}

async function getNews() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<NewsData>({
      query: GET_NEWS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeNewsItems?.nodes || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const news = await getNews()

  // Sort by date (newest first), with featured items first
  const sortedNews = [...news].sort((a, b) => {
    // Featured items come first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    // Then sort by date
    return (b.created?.timestamp || 0) - (a.created?.timestamp || 0)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <Newspaper className="w-8 h-8 text-purple-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Campus News
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Stay connected with the latest stories, announcements, and achievements from our university community.
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No News Yet</h2>
              <p className="text-gray-500">
                News articles will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
