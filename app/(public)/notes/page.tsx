import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { NotesPageContent } from "@/components/public/notes/notes-page-content"

export const metadata = {
  title: "Lab Notes | EinCode",
  description: "Technical findings, observations, and thoughts from the workbench.",
}

export default function NotesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <div className="pt-24">
          <NotesPageContent />
        </div>
        <Footer />
      </div>
    </main>
  )
}
