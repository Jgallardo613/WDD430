import { notFound } from "next/navigation";
import EditProjectForm from "@/components/EditProjectForm";
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

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">Edit Project</h1>
      <EditProjectForm
        id={id}
        defaultValues={{
          title: project.title,
          description: project.description,
          technologies: project.technologies.join(", "),
          yearCompleted: project.year_completed?.toString() ?? "",
        }}
      />
    </div>
  );
}
