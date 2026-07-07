"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { inputClass, submitButtonClass } from "@/app/admin/ui";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm text-white/70" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-white/70" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-2.5 text-sm text-ember">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className={submitButtonClass}>
        {pending ? "Sending code…" : "Continue"}
      </button>
    </form>
  );
}
