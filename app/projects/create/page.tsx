import ProjectForm from "@/components/ProjectForm";
import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">New Project</h1>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
