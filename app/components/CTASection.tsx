import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent?: DrupalHomepage | null
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const hasHomepageContent = homepageContent && homepageContent.title

  return (
    <section className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              {hasHomepageContent && homepageContent.ctaTitle
                ? homepageContent.ctaTitle
                : 'Ready to Start Your Journey?'
              }
            </h2>
            <div className="text-lg md:text-xl text-purple-800 mb-8">
              {hasHomepageContent && homepageContent.ctaDescription?.processed ? (
                <div dangerouslySetInnerHTML={{ __html: homepageContent.ctaDescription.processed }} />
              ) : (
                <p>Take the first step toward your future. Apply now or connect with our admissions team to learn more about our programs and campus life.</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors duration-200 font-bold text-lg shadow-lg"
              >
                {hasHomepageContent && homepageContent.ctaPrimary ? homepageContent.ctaPrimary : 'Apply Now'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg"
              >
                {hasHomepageContent && homepageContent.ctaSecondary ? homepageContent.ctaSecondary : 'Contact Admissions'}
              </Link>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-xl font-bold text-purple-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-purple-900">
                <div className="p-3 bg-white/40 rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Admissions Office</div>
                  <div className="text-lg font-semibold">(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-purple-900">
                <div className="p-3 bg-white/40 rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-lg font-semibold">admissions@university.edu</div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-purple-900 text-sm">
                Office Hours: Monday - Friday, 9am - 5pm EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
