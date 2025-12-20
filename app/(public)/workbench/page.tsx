import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content"

export const metadata = {
  title: "Workbench | EinCode",
  description: "Active experiments, prototypes, and work in progress from EinCode.",
}

export default function WorkbenchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <div className="pt-24">
          <WorkbenchPageContent />
        </div>
        <Footer />
      </div>
    </main>
  )
}
