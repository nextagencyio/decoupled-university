import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_FACULTY } from '@/lib/queries'
import { FacultyData, DrupalFaculty } from '@/lib/types'
import Header from '../components/Header'
import FacultyCard from '../components/FacultyCard'
import { Users } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Faculty & Staff | Decoupled University',
  description: 'Meet our distinguished faculty members who are leaders in their fields and dedicated to student success.',
}

async function getFaculty() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<FacultyData>({
      query: GET_FACULTY,
      variables: { first: 100 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeFaculties?.nodes || []
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return []
  }
}

export default async function FacultyPage() {
  const faculty = await getFaculty()

  // Group faculty by department
  const facultyByDepartment = faculty.reduce((acc, member) => {
    const dept = member.department?.[0]?.name || 'Other'
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(member)
    return acc
  }, {} as Record<string, DrupalFaculty[]>)

  const sortedDepartments = Object.keys(facultyByDepartment).sort((a, b) => {
    if (a === 'Other') return 1
    if (b === 'Other') return -1
    return a.localeCompare(b)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <Users className="w-8 h-8 text-blue-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Faculty
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet our world-class educators and researchers who are dedicated to advancing knowledge and inspiring the next generation of leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty List */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {faculty.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Faculty Listed Yet</h2>
              <p className="text-gray-500">
                Faculty profiles will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {sortedDepartments.map((department) => (
                <div key={department}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {department}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500 font-medium">
                      {facultyByDepartment[department].length} member{facultyByDepartment[department].length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {facultyByDepartment[department].map((member) => (
                      <FacultyCard key={member.id} faculty={member} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
