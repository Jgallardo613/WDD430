import Link from "next/link";
import { deleteProject } from "@/lib/actions";

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            View project &rarr;
          </a>
        )}
        <Link
          href={`/projects/${id}/edit`}
          className="ml-auto text-sm font-medium text-zinc-700 hover:underline dark:text-zinc-300"
        >
          Edit
        </Link>
        <form action={deleteProjectWithId}>
          <button
            type="submit"
            className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
