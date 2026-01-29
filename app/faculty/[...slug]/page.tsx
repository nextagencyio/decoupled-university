import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_FACULTY_BY_PATH } from '@/lib/queries'
import { DrupalFaculty } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft, Mail, Phone, MapPin, Building, User, BookOpen } from 'lucide-react'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface FacultyByPathData {
  route: {
    entity: DrupalFaculty
  } | null
}

async function getFaculty(path: string): Promise<DrupalFaculty | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<FacultyByPathData>({
      query: GET_FACULTY_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/faculty/${slug.join('/')}`
  const faculty = await getFaculty(path)

  if (!faculty) {
    return {
      title: 'Faculty Not Found | Decoupled University',
    }
  }

  return {
    title: `${faculty.title} | Faculty | Decoupled University`,
    description: faculty.position ? `${faculty.title} - ${faculty.position} at Decoupled University` : `Faculty profile for ${faculty.title}`,
  }
}

export default async function FacultyMemberPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/faculty/${slug.join('/')}`
  const faculty = await getFaculty(path)

  if (!faculty) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/faculty"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Faculty
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-gray-200">
                {faculty.photo?.url ? (
                  <ResponsiveImage
                    src={faculty.photo.url}
                    alt={faculty.photo.alt || faculty.title}
                    fill
                    className="object-cover object-top"
                    variations={faculty.photo.variations}
                    targetWidth={400}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <User className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {faculty.title}
              </h1>

              {faculty.position && (
                <p className="text-xl text-amber-400 font-semibold mb-4">{faculty.position}</p>
              )}

              {faculty.department && faculty.department.length > 0 && (
                <div className="flex items-center text-blue-200 mb-6">
                  <Building className="w-5 h-5 mr-2" />
                  {faculty.department[0].name}
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {faculty.email && (
                  <a
                    href={`mailto:${faculty.email}`}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-amber-400" />
                    <span>{faculty.email}</span>
                  </a>
                )}
                {faculty.phone && (
                  <a
                    href={`tel:${faculty.phone}`}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-amber-400" />
                    <span>{faculty.phone}</span>
                  </a>
                )}
                {faculty.office && (
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>{faculty.office}</span>
                  </div>
                )}
              </div>

              {/* Research Interests */}
              {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-blue-200 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {faculty.researchInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-block bg-amber-500 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Biography */}
          {faculty.body?.processed && (
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Biography</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: faculty.body.processed }}
              />
            </div>
          )}

          {/* Education */}
          {faculty.education?.processed && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: faculty.education.processed }}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
