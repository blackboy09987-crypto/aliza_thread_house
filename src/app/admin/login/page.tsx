"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/lib/actions/admin-auth";

const initialState: AdminLoginState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="mx-auto flex max-w-sm flex-col px-5 py-24">
      <span className="font-script text-3xl text-rose-dark">Shop owner</span>
      <h1 className="font-display text-2xl text-ink">Admin login</h1>

      <form action={action} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-ink-soft">
          Password
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
          />
        </label>

        {state.error && <p className="text-sm text-terracotta-dark">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-rose-dark px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-dark disabled:opacity-60"
        >
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
