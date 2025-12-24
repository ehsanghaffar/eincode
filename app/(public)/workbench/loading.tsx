export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-12 space-y-4">
        <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-6 w-96 bg-muted animate-pulse rounded" />
      </div>

      {/* Workbench items skeleton */}
      <div className="space-y-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="space-y-4 rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="h-8 w-2/3 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
