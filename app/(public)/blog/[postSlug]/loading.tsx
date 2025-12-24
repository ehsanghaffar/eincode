export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <header className="mb-12 space-y-6">
          <div className="h-12 w-3/4 bg-muted animate-pulse rounded-lg" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-3 w-48 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          </div>
        </header>

        {/* Content skeleton */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-8 w-1/2 bg-muted animate-pulse rounded mt-8 mb-4" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/5 bg-muted animate-pulse rounded" />
          <div className="h-32 w-full bg-muted animate-pulse rounded-lg mt-6 mb-6" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>
      </article>
    </div>
  )
}
