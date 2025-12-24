export function BlogHero() {
  return (
    <section className="px-4 sm:px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Digital Journal
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Blog &{" "}
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">Insights</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Technical deep-dives, experiments, and lessons learned from the digital laboratory. Exploring code, systems,
            and the craft of building software.
          </p>
        </div>
      </div>
    </section>
  )
}
