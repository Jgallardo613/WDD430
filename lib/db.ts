import { neon } from "@neondatabase/serverless";

// Created per call so a missing env var fails the request, not the build.
export function getSql() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is not set");
  return neon(url);
}
