import ProjectCard from "./ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
