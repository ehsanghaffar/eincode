import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";

export const metadata = {
  title: "Open Source Projects | EinCode",
  description: "Explore open source projects, experiments, and tools built by EinCode.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}
