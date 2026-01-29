import { DrupalHomepage, DrupalStatItem } from '@/lib/types'
import { Users, GraduationCap, BookOpen, Trophy } from 'lucide-react'

interface StatsSectionProps {
  homepageContent?: DrupalHomepage | null
}

const defaultStats = [
  { number: '15,000+', label: 'Students Enrolled', icon: Users },
  { number: '500+', label: 'Faculty Members', icon: GraduationCap },
  { number: '200+', label: 'Academic Programs', icon: BookOpen },
  { number: '95%', label: 'Employment Rate', icon: Trophy },
]

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  graduation: GraduationCap,
  book: BookOpen,
  trophy: Trophy,
  default: Users,
}

function getIconForIndex(index: number) {
  const icons = [Users, GraduationCap, BookOpen, Trophy]
  return icons[index % icons.length]
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const hasStats = homepageContent?.statsItems && homepageContent.statsItems.length > 0
  const stats = hasStats ? homepageContent.statsItems : null

  return (
    <section className="bg-white py-12 md:py-16 -mt-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats ? (
              stats.map((stat: DrupalStatItem, index: number) => {
                const Icon = getIconForIndex(index)
                return (
                  <div key={stat.id} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                )
              })
            ) : (
              defaultStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
