"use client";

import { useActionState } from "react";
import ProjectForm from "@/components/ProjectForm";
import { createProject, type State } from "@/lib/actions";

const initialState: State = { errors: {}, message: null };

export default function CreateProjectPage() {
  // createProject returns void only when it redirects, so fall back to prevState.
  const [state, formAction, pending] = useActionState(
    async (prevState: State, formData: FormData) =>
      (await createProject(prevState, formData)) ?? prevState,
    initialState
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">New Project</h1>
      <ProjectForm
        formAction={formAction}
        state={state}
        pending={pending}
        submitLabel="Create project"
      />
    </div>
  );
}
