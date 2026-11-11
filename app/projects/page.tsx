import { Suspense } from "react";
import Pagination from "@/components/Pagination";
import ProjectList from "@/components/ProjectList";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";
import ProjectSearch from "@/components/ProjectSearch";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";

async function FilteredProjectList({ query, page }: { query: string; page: number }) {
  const projects = await fetchFilteredProjects(query, page);

  if (projects.length === 0) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        No projects match your search.
      </p>
    );
  }

  return (
    <ProjectList
      projects={projects.map((project) => ({
        ...project,
        link: project.link ?? undefined,
      }))}
    />
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}) {
  const params = await searchParams;
  // A repeated param (?query=a&query=b) arrives as an array; ignore that form.
  const query = typeof params.query === "string" ? params.query : "";
  const parsedPage = Number(params.page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">All Projects</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Search by title, description, or technology.
        </p>
      </section>
      <ProjectSearch />
      {/* Keyed so the skeleton shows again whenever the search or page changes. */}
      <Suspense key={`${query}-${currentPage}`} fallback={<ProjectListSkeleton />}>
        <FilteredProjectList query={query} page={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
