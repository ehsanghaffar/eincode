export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero skeleton */}
      <div className="mb-12 space-y-4">
        <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-6 w-96 bg-muted animate-pulse rounded" />
      </div>

      {/* Featured post skeleton */}
      <div className="mb-12">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-video bg-muted animate-pulse rounded-lg" />
            <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Blog list skeleton */}
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex gap-6 p-6 border border-border rounded-lg bg-card"
          >
            <div className="flex-1 space-y-4">
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
