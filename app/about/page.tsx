import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                  Welcome to CodeForge
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                  Where Code Meets <span className="text-primary">Creativity</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                CodeForge is a digital workshop and portfolio platform designed for developers who believe in building
                in public. It&apos;s a space where ideas take shape, experiments unfold, and open-source projects come
                to life.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative px-4 sm:px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                  About the Platform
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A Developer&apos;s Digital Workshop</h2>
              </div>

              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  CodeForge isn&apos;t just another portfolio website—it&apos;s a living, breathing showcase of
                  continuous learning and experimentation. Built by developers, for developers, it represents the
                  philosophy that the best way to learn is to build, share, and iterate.
                </p>

                <p>
                  Whether you&apos;re exploring cutting-edge AI integrations, diving into systems programming, or
                  looking for modern web development patterns, CodeForge offers a window into real-world projects at
                  various stages of development—from initial experiments to production-ready solutions.
                </p>

                <p>
                  The platform is fully open-source, encouraging collaboration and knowledge sharing within the
                  developer community. Every project, every lab note, and every line of code is designed to inspire and
                  educate.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mt-8 pt-8 border-t border-border/50">
                {[
                  {
                    title: "Open Source",
                    description: "Every project is available on GitHub for learning and collaboration",
                  },
                  {
                    title: "Building in Public",
                    description: "Real-time updates on experiments, successes, and lessons learned",
                  },
                  {
                    title: "Continuous Learning",
                    description: "A commitment to exploring new technologies and sharing insights",
                  },
                  {
                    title: "Developer First",
                    description: "Built with modern tools and best practices for the developer community",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="space-y-2">
                    <h3 className="font-mono text-sm font-semibold text-primary uppercase tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
