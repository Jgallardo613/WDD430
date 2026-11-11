"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const base = "rounded-lg border px-4 py-2 text-sm font-medium";
  const enabled =
    "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";
  const disabled =
    "pointer-events-none border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      {hasPrev ? (
        <Link href={createPageURL(currentPage - 1)} className={`${base} ${enabled}`}>
          &larr; Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>
          &larr; Previous
        </span>
      )}

      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link href={createPageURL(currentPage + 1)} className={`${base} ${enabled}`}>
          Next &rarr;
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>
          Next &rarr;
        </span>
      )}
    </nav>
  );
}
