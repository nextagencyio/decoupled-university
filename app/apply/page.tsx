import { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import { GraduationCap, Calendar, FileText, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Apply | Decoupled University',
  description: 'Start your application to Decoupled University. Join our community of scholars and begin your academic journey.',
}

const applicationSteps = [
  {
    icon: FileText,
    title: 'Submit Your Application',
    description: 'Complete our online application form with your personal information, academic history, and program preferences.',
  },
  {
    icon: Calendar,
    title: 'Submit Documents',
    description: 'Upload your transcripts, test scores, letters of recommendation, and personal statement.',
  },
  {
    icon: CheckCircle,
    title: 'Application Review',
    description: 'Our admissions committee will review your application and notify you of their decision.',
  },
]

const deadlines = [
  { term: 'Fall 2025 Early Decision', date: 'November 1, 2024', status: 'upcoming' },
  { term: 'Fall 2025 Regular Decision', date: 'January 15, 2025', status: 'upcoming' },
  { term: 'Spring 2025', date: 'October 1, 2024', status: 'upcoming' },
]

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-purple-900" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Start Your Journey
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Join our community of scholars, innovators, and leaders. Your future begins here at Decoupled University.
            </p>
            <a
              href="#apply-now"
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors font-bold text-lg"
            >
              Begin Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-purple-700" />
                      </div>
                      <span className="text-4xl font-bold text-purple-100">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Application Deadlines</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {deadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{deadline.term}</h3>
                    <p className="text-gray-600">{deadline.date}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply-now" className="py-16 md:py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
            Ready to Apply?
          </h2>
          <p className="text-lg text-purple-800 mb-8">
            This is a demo university template. In a real application, this would link to your application portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-900 text-white rounded-lg font-bold text-lg hover:bg-purple-800 transition-colors"
            >
              Undergraduate Application
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Graduate Application
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Admissions?</h2>
          <p className="text-gray-400 mb-6">
            Our admissions team is here to help you through every step of the application process.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium"
          >
            Contact Admissions
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
