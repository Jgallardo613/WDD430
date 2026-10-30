import { cacheLife } from "next/cache";

export default async function Footer() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-zinc-500">
        &copy; {year} My Portfolio. All rights reserved.
      </p>
    </footer>
  );
}
