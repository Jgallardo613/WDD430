import { Suspense } from "react";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";
import { getProjectsByType } from "@/lib/projects-db";

async function SchoolProjectList() {
  // Render at request time so the list always reflects the current database.
  await connection();
  const projects = await getProjectsByType("school");

  return (
    <ProjectList
      projects={projects.map((project) => ({
        ...project,
        link: project.link ?? undefined,
      }))}
    />
  );
}

export default function SchoolPage() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">School Projects</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Projects I&apos;ve built for my coursework.
        </p>
      </section>
      <Suspense fallback={<ProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </div>
  );
}
