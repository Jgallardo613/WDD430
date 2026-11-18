"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
});

// Created per call so a missing env var fails the action, not the build.
function getSql() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is not set");
  return neon(url);
}

function parseProjectForm(formData: FormData) {
  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
  });
  if (!parsed.success) {
    throw new Error("Invalid project data. Please check the form and try again.");
  }

  const { title, description, technologies } = parsed.data;
  return {
    title: title.trim(),
    description: description.trim(),
    // "React, Next.js, SQL" -> ["React", "Next.js", "SQL"]
    technologies: technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean),
  };
}

// Server actions are public endpoints, so never trust the id blindly.
function assertValidId(id: number) {
  if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
    throw new Error("Invalid project id");
  }
}

export async function createProject(formData: FormData) {
  const { title, description, technologies } = parseProjectForm(formData);
  const sql = getSql();

  // The table requires a type; new projects default to 'personal'.
  await sql`
    INSERT INTO projects (title, description, technologies, type)
    VALUES (${title}, ${description}, ${technologies}, 'personal')
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: number, formData: FormData) {
  assertValidId(id);
  const { title, description, technologies } = parseProjectForm(formData);
  const sql = getSql();

  await sql`
    UPDATE projects
    SET title = ${title},
        description = ${description},
        technologies = ${technologies}
    WHERE id = ${id}
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: number) {
  assertValidId(id);
  const sql = getSql();

  await sql`DELETE FROM projects WHERE id = ${id}`;

  revalidatePath("/projects");
}
