"use client";

import { useState } from "react";
import { FormInlineError } from "@/components/FormInlineError";
import { validateEmail, validateRequiredText } from "@/lib/formValidation";

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("idle");

    const nameErr = validateRequiredText(values.name, "Name", 2, 120);
    if (nameErr) {
      setError(nameErr);
      return;
    }
    const emailErr = validateEmail(values.email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (values.company.trim().length > 200) {
      setError("Company must be at most 200 characters.");
      return;
    }
    const msgErr = validateRequiredText(values.message, "Message", 10, 8000);
    if (msgErr) {
      setError(msgErr);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Could not send message.");
        return;
      }
      setStatus("success");
      setValues({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/25 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex h-full min-h-0 flex-col gap-4 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-card backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-8"
    >
      <h2 className="font-display text-lg font-semibold text-brand-navy dark:text-slate-100">
        Send a message
      </h2>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Name *
        <input
          className={inputClass}
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          name="name"
        />
      </label>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Work email *
        <input
          type="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          name="email"
        />
      </label>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Company
        <input
          className={inputClass}
          value={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
          name="company"
        />
      </label>
      <label className="flex min-h-0 flex-1 flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
        How can we help? *
        <textarea
          rows={4}
          className={`${inputClass} min-h-[7rem] flex-1 resize-y`}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          name="message"
        />
      </label>
      {error ? <FormInlineError message={error} /> : null}
      {status === "success" ? (
        <p className="rounded-2xl border border-emerald-200/90 bg-emerald-50/95 px-4 py-3 text-sm font-medium text-emerald-900 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-950/40 dark:text-emerald-100 dark:shadow-card">
          Thanks—your message was received. We&apos;ll get back to you shortly.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-accent px-8 py-3 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
