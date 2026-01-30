import Header from '@/app/components/Header'

function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6 animate-pulse" />
            <div className="h-12 bg-white/20 rounded-lg w-80 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-white/10 rounded w-96 max-w-full mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Cards Grid Skeleton */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
