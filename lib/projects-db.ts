import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  type: string;
}

// All values go through the sql`...${}` tagged template, which sends them as
// query parameters — never build SQL with string concatenation.

export async function getProjects(type?: string): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT id, title, description, technologies, link, type
      FROM projects
      WHERE type = ${type}
      ORDER BY id
    `;
    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    ORDER BY id
  `;
  return rows;
}

export async function getProjectsByType(type: string): Promise<Project[]> {
  return getProjects(type);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
