"use client";

import Link from "next/link";
import type { State } from "@/lib/actions";

export type ProjectFormValues = {
  title: string;
  description: string;
  technologies: string;
  yearCompleted: string;
};

type ProjectFormProps = {
  formAction: (formData: FormData) => void;
  state: State;
  pending: boolean;
  submitLabel: string;
  defaultValues?: ProjectFormValues;
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-900";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function ProjectForm({
  formAction,
  state,
  pending,
  submitLabel,
  defaultValues,
}: ProjectFormProps) {
  const currentYear = new Date().getFullYear();
  // After a failed submit, re-fill the fields with what the user typed.
  const values = state.values ?? defaultValues;
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={2}
          defaultValue={values?.title}
          aria-describedby="title-error"
          aria-invalid={errors.title ? true : undefined}
          className={inputClass}
        />
        <FieldError id="title-error" errors={errors.title} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          minLength={10}
          defaultValue={values?.description}
          aria-describedby="description-error"
          aria-invalid={errors.description ? true : undefined}
          className={inputClass}
        />
        <FieldError id="description-error" errors={errors.description} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="technologies" className="text-sm font-medium">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          minLength={2}
          placeholder="React, Next.js, PostgreSQL"
          defaultValue={values?.technologies}
          aria-describedby="technologies-hint technologies-error"
          aria-invalid={errors.technologies ? true : undefined}
          className={inputClass}
        />
        <p id="technologies-hint" className="text-xs text-zinc-500">
          Separate technologies with commas.
        </p>
        <FieldError id="technologies-error" errors={errors.technologies} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="yearCompleted" className="text-sm font-medium">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          required
          min={2000}
          max={currentYear}
          step={1}
          defaultValue={values?.yearCompleted}
          aria-describedby="yearCompleted-error"
          aria-invalid={errors.yearCompleted ? true : undefined}
          className={inputClass}
        />
        <FieldError id="yearCompleted-error" errors={errors.yearCompleted} />
      </div>

      <div id="form-message" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/projects"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
