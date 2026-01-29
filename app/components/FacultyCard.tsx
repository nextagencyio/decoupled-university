import Link from 'next/link'
import { DrupalFaculty } from '@/lib/types'
import { Mail, Phone, MapPin, User } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface FacultyCardProps {
  faculty: DrupalFaculty
}

export default function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <Link
      href={faculty.path || `/faculty/${faculty.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        {faculty.photo?.url ? (
          <ResponsiveImage
            src={faculty.photo.url}
            alt={faculty.photo.alt || faculty.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            variations={faculty.photo.variations}
            targetWidth={300}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {faculty.title}
        </h3>

        {faculty.position && (
          <p className="text-blue-600 font-medium mb-2">{faculty.position}</p>
        )}

        {faculty.department && faculty.department.length > 0 && (
          <p className="text-gray-600 text-sm mb-4">{faculty.department[0].name}</p>
        )}

        <div className="space-y-2 text-sm text-gray-500">
          {faculty.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="truncate">{faculty.email}</span>
            </div>
          )}
          {faculty.office && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{faculty.office}</span>
            </div>
          )}
        </div>

        {faculty.researchInterests && faculty.researchInterests.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {faculty.researchInterests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
              {faculty.researchInterests.length > 3 && (
                <span className="inline-block text-gray-400 px-2 py-1 text-xs">
                  +{faculty.researchInterests.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
