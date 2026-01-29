import Link from 'next/link'
import { DrupalProgram } from '@/lib/types'
import { Clock, Award, ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface ProgramCardProps {
  program: DrupalProgram
  featured?: boolean
}

export default function ProgramCard({ program, featured = false }: ProgramCardProps) {
  return (
    <Link
      href={program.path || `/programs/${program.id}`}
      className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
        featured ? 'ring-2 ring-amber-400' : ''
      }`}
    >
      <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-700">
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
          <div className="absolute top-4 left-4 bg-amber-500 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
            {program.degreeType}
          </div>
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-purple-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        {program.department && program.department.length > 0 && (
          <div className="text-sm text-purple-700 font-medium mb-2">
            {program.department[0].name}
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
          {program.title}
        </h3>

        {program.body?.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {program.body.summary}
          </p>
        )}

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

        <div className="flex items-center text-purple-700 font-medium group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
