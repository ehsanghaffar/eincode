import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { ProjectsPageContent } from "@/components/public/projects/projects-page-content"

export const metadata = {
  title: "Open Source Projects | EinCode",
  description: "Explore open source projects, experiments, and tools built by EinCode.",
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <div className="pt-24">
          <ProjectsPageContent />
        </div>
        <Footer />
      </div>
    </main>
  )
}
