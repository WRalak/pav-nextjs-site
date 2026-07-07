"use client";

import { useActionState, useState, useTransition } from "react";
import { verify, resendCode } from "./actions";
import { inputClass, submitButtonClass, secondaryButtonClass } from "@/app/admin/ui";

export function VerifyForm() {
  const [state, formAction, pending] = useActionState(verify, undefined);
  const [resendMessage, setResendMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [isResending, startResend] = useTransition();

  function handleResend() {
    setResendMessage(null);
    startResend(async () => {
      const result = await resendCode();
      if (result?.error) {
        setResendMessage({ ok: false, text: result.error });
      } else {
        setResendMessage({ ok: true, text: result?.info ?? "A new code is on its way." });
      }
    });
  }

  return (
    <div className="space-y-5">
      <form action={formAction} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm text-white/70" htmlFor="code">
            6-digit code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoComplete="one-time-code"
            className={`${inputClass} text-center text-2xl tracking-[0.5em]`}
          />
        </div>

        {state?.error && (
          <p className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-2.5 text-sm text-ember">
            {state.error}
          </p>
        )}

        <button type="submit" disabled={pending} className={submitButtonClass}>
          {pending ? "Verifying…" : "Verify & continue"}
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className={secondaryButtonClass}
        >
          {isResending ? "Sending…" : "Resend code"}
        </button>
        {resendMessage && (
          <p className={`mt-3 text-sm ${resendMessage.ok ? "text-savanna" : "text-ember"}`}>
            {resendMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}
