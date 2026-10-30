import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          My Portfolio
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
