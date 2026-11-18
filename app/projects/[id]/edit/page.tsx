import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  if (!/^\d+$/.test(idParam) || Number(idParam) > 2147483647) notFound();

  const id = Number(idParam);
  const project = await getProjectById(id);
  if (!project) notFound();

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">Edit Project</h1>
      <ProjectForm
        action={updateProjectWithId}
        submitLabel="Save changes"
        defaultValues={{
          title: project.title,
          description: project.description,
          technologies: project.technologies.join(", "),
        }}
      />
    </div>
  );
}
