import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_PROGRAM_BY_PATH } from '@/lib/queries'
import { DrupalProgram } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { Clock, Award, ArrowLeft, CheckCircle, Building } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface ProgramByPathData {
  route: {
    entity: DrupalProgram
  } | null
}

async function getProgram(path: string): Promise<DrupalProgram | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ProgramByPathData>({
      query: GET_PROGRAM_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching program:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/programs/${slug.join('/')}`
  const program = await getProgram(path)

  if (!program) {
    return {
      title: 'Program Not Found | Decoupled University',
    }
  }

  return {
    title: `${program.title} | Decoupled University`,
    description: program.body?.summary || `Learn about the ${program.title} program at Decoupled University.`,
  }
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/programs/${slug.join('/')}`
  const program = await getProgram(path)

  if (!program) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/programs"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {program.degreeType && (
                <span className="inline-block bg-amber-500 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  {program.degreeType}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {program.title}
              </h1>
              {program.department && program.department.length > 0 && (
                <div className="flex items-center text-purple-200 mb-6">
                  <Building className="w-5 h-5 mr-2" />
                  {program.department[0].name}
                </div>
              )}

              <div className="flex flex-wrap gap-6 text-purple-100">
                {program.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{program.duration}</span>
                  </div>
                )}
                {program.credits && (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>{program.credits} Credits</span>
                  </div>
                )}
              </div>
            </div>

            {program.image?.url && (
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                <ResponsiveImage
                  src={program.image.url}
                  alt={program.image.alt || program.title}
                  fill
                  className="object-cover"
                  variations={program.image.variations}
                  targetWidth={600}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {program.body?.processed && (
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: program.body.processed }}
                  />
                </div>
              )}

              {/* Highlights */}
              {program.highlights && program.highlights.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {program.highlights.map((highlight) => (
                      <div key={highlight.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-purple-700" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{highlight.title}</h3>
                          {highlight.description?.processed && (
                            <div
                              className="text-gray-600 text-sm"
                              dangerouslySetInnerHTML={{ __html: highlight.description.processed }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Program Details</h3>
                <dl className="space-y-4">
                  {program.degreeType && (
                    <div>
                      <dt className="text-sm text-gray-500">Degree Type</dt>
                      <dd className="font-semibold text-gray-900">{program.degreeType}</dd>
                    </div>
                  )}
                  {program.department && program.department.length > 0 && (
                    <div>
                      <dt className="text-sm text-gray-500">Department</dt>
                      <dd className="font-semibold text-gray-900">{program.department[0].name}</dd>
                    </div>
                  )}
                  {program.duration && (
                    <div>
                      <dt className="text-sm text-gray-500">Duration</dt>
                      <dd className="font-semibold text-gray-900">{program.duration}</dd>
                    </div>
                  )}
                  {program.credits && (
                    <div>
                      <dt className="text-sm text-gray-500">Credits Required</dt>
                      <dd className="font-semibold text-gray-900">{program.credits}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 space-y-3">
                  <a
                    href="/apply"
                    className="block w-full text-center px-6 py-3 bg-amber-500 text-purple-900 rounded-lg font-bold hover:bg-amber-400 transition-colors"
                  >
                    Apply Now
                  </a>
                  <a
                    href="/contact"
                    className="block w-full text-center px-6 py-3 border-2 border-purple-900 text-purple-900 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Request Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
