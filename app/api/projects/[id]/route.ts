import type { NextRequest } from "next/server";
import { getProjectById } from "@/lib/projects-db";

const MAX_INT = 2147483647; // Postgres INTEGER / SERIAL upper bound

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;

  if (!/^\d+$/.test(idParam) || Number(idParam) > MAX_INT) {
    return Response.json({ error: "Project id must be a number" }, { status: 400 });
  }

  try {
    const project = await getProjectById(Number(idParam));
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    return Response.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
