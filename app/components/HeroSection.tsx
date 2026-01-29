import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent?: DrupalHomepage | null
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const hasHomepageContent = homepageContent && homepageContent.title

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {hasHomepageContent && homepageContent.heroTitle ? (
              <>
                {homepageContent.heroTitle}
                {homepageContent.heroSubtitle && (
                  <span className="block text-amber-400 mt-2">{homepageContent.heroSubtitle}</span>
                )}
              </>
            ) : (
              <>
                Welcome to
                <span className="block text-amber-400 mt-2">Decoupled University</span>
              </>
            )}
          </h1>

          <div className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 md:mb-10 max-w-3xl mx-auto">
            {hasHomepageContent && homepageContent.heroDescription?.processed ? (
              <div dangerouslySetInnerHTML={{ __html: homepageContent.heroDescription.processed }} />
            ) : (
              <p>Empowering minds, shaping futures. Discover world-class programs and join our community of scholars.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-blue-900 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Explore Programs
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 font-semibold text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
