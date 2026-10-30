import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "OrbitWatch",
    description:
      "A space situational awareness dashboard with live satellite tracking, NOAA space weather feeds, and a satellite watchlist.",
    technologies: ["JavaScript", "HTML", "CSS", "Vite", "N2YO API", "NOAA API"],
    link: "https://github.com/Jgallardo613/Orbitwatch",
  },
  {
    title: "Aether LIDAR API",
    description:
      "A RESTful API with full CRUD operations, GitHub OAuth authentication, and Swagger documentation.",
    technologies: ["Node.js", "Express", "MongoDB", "OAuth", "Swagger"],
    link: "https://github.com/Jgallardo613/aether-lidar-api",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Here are some of the projects I&apos;ve built.
        </p>
      </section>
      <ProjectList projects={projects} />
    </div>
  );
}
