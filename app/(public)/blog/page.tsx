import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { BlogHero } from "@/components/public/blog/blog-hero"
import { BlogList } from "@/components/public/blog/blog-list"
import { BlogSidebar } from "@/components/public/blog/blog-sidebar"

export const metadata = {
  title: "Blog — EINCODE Digital Lab",
  description: "Technical articles, experiments, and insights from the digital laboratory.",
}

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <BlogHero />
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              <BlogList />
              <BlogSidebar />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}
