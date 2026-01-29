import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_PROGRAMS } from '@/lib/queries'
import { ProgramsData } from '@/lib/types'
import Header from '../components/Header'
import ProgramCard from '../components/ProgramCard'
import { GraduationCap } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Academic Programs | Decoupled University',
  description: 'Explore our comprehensive range of undergraduate, graduate, and doctoral programs designed to prepare you for success.',
}

async function getPrograms() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ProgramsData>({
      query: GET_PROGRAMS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodePrograms?.nodes || []
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  // Group programs by degree type
  const programsByDegree = programs.reduce((acc, program) => {
    const type = program.degreeType || 'Other'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(program)
    return acc
  }, {} as Record<string, typeof programs>)

  const degreeOrder = ['Bachelor\'s', 'Master\'s', 'Doctoral', 'Certificate', 'Other']
  const sortedDegreeTypes = Object.keys(programsByDegree).sort((a, b) => {
    const aIndex = degreeOrder.indexOf(a)
    const bIndex = degreeOrder.indexOf(b)
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-purple-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Academic Programs
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover world-class education across diverse disciplines. Our programs combine rigorous academics with hands-on experience to prepare you for success.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Programs Yet</h2>
              <p className="text-gray-500">
                Programs will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {sortedDegreeTypes.map((degreeType) => (
                <div key={degreeType}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {degreeType} Programs
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500 font-medium">
                      {programsByDegree[degreeType].length} program{programsByDegree[degreeType].length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programsByDegree[degreeType].map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
            Not sure which program is right for you?
          </h2>
          <p className="text-purple-800 mb-6 max-w-2xl mx-auto">
            Our admissions counselors are here to help you find the perfect fit for your academic and career goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors font-bold"
          >
            Talk to an Advisor
          </a>
        </div>
      </section>
    </div>
  )
}
