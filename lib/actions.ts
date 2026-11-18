"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSql } from "@/lib/db";

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
  // What the user submitted, so the form can re-fill fields after an error.
  values?: {
    title: string;
    description: string;
    technologies: string;
    yearCompleted: string;
  };
};

// Built per call so the max year is always the current year.
function getProjectFormSchema() {
  const currentYear = new Date().getFullYear();
  return z.object({
    title: z.string().trim().min(2, "Title must be at least 2 characters."),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters."),
    technologies: z
      .string()
      .trim()
      .min(2, "Technologies must be at least 2 characters."),
    yearCompleted: z.coerce
      .number({ error: "Year completed must be a number." })
      .int("Year completed must be a whole year.")
      .min(2000, "Year completed must be 2000 or later.")
      .max(currentYear, `Year completed cannot be later than ${currentYear}.`),
  });
}

function readValues(formData: FormData) {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    title: get("title"),
    description: get("description"),
    technologies: get("technologies"),
    yearCompleted: get("yearCompleted"),
  };
}

type ParseResult =
  | {
      ok: true;
      data: {
        title: string;
        description: string;
        technologies: string[];
        yearCompleted: number;
      };
    }
  | { ok: false; state: State };

function parseProjectForm(formData: FormData): ParseResult {
  const values = readValues(formData);
  const parsed = getProjectFormSchema().safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      state: {
        errors: z.flattenError(parsed.error).fieldErrors,
        message: "Some fields need attention. Please fix them and try again.",
        values,
      },
    };
  }

  const { title, description, technologies, yearCompleted } = parsed.data;
  return {
    ok: true,
    data: {
      title,
      description,
      // "React, Next.js, SQL" -> ["React", "Next.js", "SQL"]
      technologies: technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      yearCompleted,
    },
  };
}

// Server actions are public endpoints, so never trust the id blindly.
function isValidId(id: number) {
  return Number.isInteger(id) && id >= 1 && id <= 2147483647;
}

export async function createProject(
  prevState: State,
  formData: FormData
): Promise<State | void> {
  const result = parseProjectForm(formData);
  if (!result.ok) return result.state;

  const { title, description, technologies, yearCompleted } = result.data;

  try {
    const sql = getSql();
    // The table requires a type; new projects default to 'personal'.
    await sql`
      INSERT INTO projects (title, description, technologies, type, year_completed)
      VALUES (${title}, ${description}, ${technologies}, 'personal', ${yearCompleted})
    `;
  } catch (error) {
    console.error("Failed to create project:", error);
    return {
      message: "Database error: the project could not be created.",
      values: readValues(formData),
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State | void> {
  if (!isValidId(id)) return { message: "Invalid project id." };

  const result = parseProjectForm(formData);
  if (!result.ok) return result.state;

  const { title, description, technologies, yearCompleted } = result.data;

  try {
    const sql = getSql();
    await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          technologies = ${technologies},
          year_completed = ${yearCompleted}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Failed to update project:", error);
    return {
      message: "Database error: the project could not be updated.",
      values: readValues(formData),
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: number) {
  if (!isValidId(id)) throw new Error("Invalid project id");
  const sql = getSql();

  await sql`DELETE FROM projects WHERE id = ${id}`;

  revalidatePath("/projects");
}
