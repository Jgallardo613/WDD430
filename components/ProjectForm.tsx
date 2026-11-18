import Link from "next/link";

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: {
    title: string;
    description: string;
    technologies: string;
  };
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-900";

export default function ProjectForm({ action, submitLabel, defaultValues }: ProjectFormProps) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={2}
          defaultValue={defaultValues?.title}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          minLength={10}
          defaultValue={defaultValues?.description}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="technologies" className="text-sm font-medium">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          minLength={2}
          placeholder="React, Next.js, PostgreSQL"
          defaultValue={defaultValues?.technologies}
          className={inputClass}
        />
        <p className="text-xs text-zinc-500">Separate technologies with commas.</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
        <Link
          href="/projects"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
