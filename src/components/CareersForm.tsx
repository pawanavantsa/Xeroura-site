"use client";

import { useState } from "react";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  employer: "",
  jobTitle: "",
  specialization: "",
  yearsExperience: "",
  preferredRole: "",
  linkedin: "",
  portfolio: "",
  message: "",
};

export function CareersForm() {
  const [values, setValues] = useState(initial);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append("resume", file);

    try {
      const res = await fetch("/api/careers", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setValues(initial);
      setFile(null);
      setFileName(null);
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/25 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500";

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-card backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Full name *
          <input
            required
            className={inputClass}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            name="fullName"
            autoComplete="name"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email *
          <input
            required
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            name="email"
            autoComplete="email"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone *
          <input
            required
            className={inputClass}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            name="phone"
            autoComplete="tel"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Current employer / organization *
          <input
            required
            className={inputClass}
            value={values.employer}
            onChange={(e) => update("employer", e.target.value)}
            name="employer"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Current job title *
          <input
            required
            className={inputClass}
            value={values.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
            name="jobTitle"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Specialization / skill set *
          <input
            required
            className={inputClass}
            value={values.specialization}
            onChange={(e) => update("specialization", e.target.value)}
            name="specialization"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Years of experience *
          <input
            required
            className={inputClass}
            value={values.yearsExperience}
            onChange={(e) => update("yearsExperience", e.target.value)}
            name="yearsExperience"
            placeholder="e.g. 4"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Preferred job role *
          <input
            required
            className={inputClass}
            value={values.preferredRole}
            onChange={(e) => update("preferredRole", e.target.value)}
            name="preferredRole"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Upload resume (PDF / DOC) *
          <input
            required
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-brand-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-primary`}
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              setFileName(f?.name ?? null);
            }}
            name="resume"
          />
          {fileName ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Selected: {fileName}</p>
          ) : null}
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          LinkedIn (optional)
          <input
            className={inputClass}
            value={values.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            name="linkedin"
            placeholder="https://"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Portfolio / GitHub (optional)
          <input
            className={inputClass}
            value={values.portfolio}
            onChange={(e) => update("portfolio", e.target.value)}
            name="portfolio"
            placeholder="https://"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Message / additional notes
          <textarea
            rows={4}
            className={`${inputClass} resize-y`}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            name="message"
          />
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status === "success" ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Thank you—your details were received. Our team will review your profile and reach
          out when there is a suitable opportunity.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-accent px-8 py-3 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit application"}
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-500">
        By submitting, you agree to our{" "}
        <a className="font-semibold text-brand-primary hover:text-brand-accent" href="/privacy-policy">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a className="font-semibold text-brand-primary hover:text-brand-accent" href="/terms-and-conditions">
          Terms &amp; Conditions
        </a>
        .
      </p>
    </form>
  );
}
