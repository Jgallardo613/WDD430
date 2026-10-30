import SkillCard from "@/components/SkillCard";

const skillCategories = [
  { category: "Languages", skills: ["JavaScript", "TypeScript", "HTML", "CSS"] },
  { category: "Frameworks", skills: ["React", "Next.js", "Express", "Tailwind CSS"] },
  { category: "Databases", skills: ["MongoDB", "PostgreSQL"] },
  { category: "Tools", skills: ["Git", "GitHub", "VS Code", "npm"] },
];

export default function About() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          I&apos;m a web developer studying full-stack development. Here are
          the skills I work with.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map(({ category, skills }) => (
          <SkillCard key={category} category={category} skills={skills} />
        ))}
      </div>
    </div>
  );
}
