import { getSql } from "@/lib/db";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  type: string;
  year_completed: number | null;
}

// All values go through the sql`...${}` tagged template, which sends them as
// query parameters — never build SQL with string concatenation.

export async function getProjects(type?: string): Promise<Project[]> {
  const sql = getSql();

  if (type) {
    return (await sql`
      SELECT id, title, description, technologies, link, type, year_completed
      FROM projects
      WHERE type = ${type}
      ORDER BY id
    `) as Project[];
  }

  return (await sql`
    SELECT id, title, description, technologies, link, type, year_completed
    FROM projects
    ORDER BY id
  `) as Project[];
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
  const sql = getSql();
  const pattern = toSearchPattern(query);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  return (await sql`
    SELECT id, title, description, technologies, link, type, year_completed
    FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `) as Project[];
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const sql = getSql();
  const pattern = toSearchPattern(query);

  const rows = (await sql`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
  `) as { count: string }[];
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, title, description, technologies, link, type, year_completed
    FROM projects
    WHERE id = ${id}
  `) as Project[];
  return rows[0] ?? null;
}
