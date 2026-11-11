// Placeholder matching ProjectList's grid and ProjectCard's layout.
export default function ProjectListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2" aria-hidden="true">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-6 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-6 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}
