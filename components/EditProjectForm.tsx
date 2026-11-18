"use client";

import { useActionState } from "react";
import ProjectForm, { type ProjectFormValues } from "@/components/ProjectForm";
import { updateProject, type State } from "@/lib/actions";

const initialState: State = { errors: {}, message: null };

export default function EditProjectForm({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: ProjectFormValues;
}) {
  const updateProjectWithId = updateProject.bind(null, id);
  // updateProject returns void only when it redirects, so fall back to prevState.
  const [state, formAction, pending] = useActionState(
    async (prevState: State, formData: FormData) =>
      (await updateProjectWithId(prevState, formData)) ?? prevState,
    initialState
  );

  return (
    <ProjectForm
      formAction={formAction}
      state={state}
      pending={pending}
      submitLabel="Save changes"
      defaultValues={defaultValues}
    />
  );
}
