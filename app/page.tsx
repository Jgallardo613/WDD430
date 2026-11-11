import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function Home() {
  // Render at request time so the list always reflects the current database.
  await connection();
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Here are some of the projects I&apos;ve built.
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
