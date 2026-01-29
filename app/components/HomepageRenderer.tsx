'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import ProgramsPreview from './ProgramsPreview'
import NewsPreview from './NewsPreview'
import EventsPreview from './EventsPreview'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <ProgramsPreview homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <NewsPreview />
      </ErrorBoundary>

      <ErrorBoundary>
        <EventsPreview />
      </ErrorBoundary>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Decoupled University</h3>
              <p className="text-gray-400 mb-4">
                Empowering minds and shaping futures through excellence in education, research, and community engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/programs" className="hover:text-amber-400 transition-colors">Programs</a></li>
                <li><a href="/faculty" className="hover:text-amber-400 transition-colors">Faculty</a></li>
                <li><a href="/events" className="hover:text-amber-400 transition-colors">Events</a></li>
                <li><a href="/news" className="hover:text-amber-400 transition-colors">News</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 University Ave</li>
                <li>Academic City, AC 12345</li>
                <li>info@university.edu</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Decoupled University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
