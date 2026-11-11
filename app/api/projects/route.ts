import type { NextRequest } from "next/server";
import { getProjects } from "@/lib/projects-db";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") ?? undefined;

  try {
    const projects = await getProjects(type);
    return Response.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
