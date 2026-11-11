import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjectsByType } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  // Render at request time so the list always reflects the current database.
  await connection();
  const projects = await getProjectsByType("opensource");

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">Open Source</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Open source projects I&apos;ve worked on.
        </p>
      </section>
      <ProjectList
        projects={projects.map((project) => ({
          ...project,
          link: project.link ?? undefined,
        }))}
      />
    </div>
  );
}
