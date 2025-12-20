import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content";

export const metadata = {
  title: "Workbench | EinCode",
  description: "Active experiments, prototypes, and work in progress from EinCode.",
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}
