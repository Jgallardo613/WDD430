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

export const ITEMS_PER_PAGE = 6;

// Builds an ILIKE pattern that matches `query` literally anywhere in the text.
// The user's % and _ are escaped so they are not treated as wildcards. The
// result is passed to sql`` as a bound parameter, never spliced into SQL.
function toSearchPattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, "\\$&")}%`;
}

export async function fetchFilteredProjects(
  query: string,
  page: number
): Promise<Project[]> {
  const pattern = toSearchPattern(query);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { rows } = await sql<Project>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const pattern = toSearchPattern(query);

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
