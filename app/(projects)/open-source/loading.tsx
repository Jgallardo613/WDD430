import ProjectListSkeleton from "@/components/ProjectListSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading projects">
      <section className="animate-pulse">
        <div className="h-10 w-56 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 h-6 w-80 max-w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      </section>
      <ProjectListSkeleton />
    </div>
  );
}
