import { NotesPageContent } from "@/components/public/notes/notes-page-content";

export const metadata = {
  title: "Lab Notes | EinCode",
  description: "Technical findings, observations, and thoughts from the workbench.",
};

export default function NotesPage() {
  return (
    <div className="pt-24">
      <NotesPageContent />
    </div>
  );
}
