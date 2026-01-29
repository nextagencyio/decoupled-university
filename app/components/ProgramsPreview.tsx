'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_PROGRAMS } from '@/lib/queries'
import { DrupalHomepage, DrupalProgram } from '@/lib/types'
import { Clock, Award, ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface ProgramsPreviewProps {
  homepageContent?: DrupalHomepage | null
}

interface FeaturedProgramsData {
  nodePrograms: {
    nodes: DrupalProgram[]
  }
}

export default function ProgramsPreview({ homepageContent }: ProgramsPreviewProps) {
  const { data, loading, error } = useQuery<FeaturedProgramsData>(GET_FEATURED_PROGRAMS)

  const programs = data?.nodePrograms?.nodes || []
  const sectionTitle = homepageContent?.featuredProgramsTitle || 'Featured Programs'

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || programs.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our world-class academic programs designed to prepare you for success in your chosen field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.path || `/programs/${program.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
                {program.image?.url ? (
                  <ResponsiveImage
                    src={program.image.url}
                    alt={program.image.alt || program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    variations={program.image.variations}
                    targetWidth={400}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="w-16 h-16 text-white/50" />
                  </div>
                )}
                {program.degreeType && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {program.degreeType}
                  </div>
                )}
              </div>

              <div className="p-6">
                {program.department && program.department.length > 0 && (
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {program.department[0].name}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {program.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {program.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                  )}
                  {program.credits && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{program.credits} Credits</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
