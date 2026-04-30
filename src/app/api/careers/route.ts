import { NextResponse } from "next/server";
import {
  validateEmail,
  validateLinkedIn,
  validateOptionalUrl,
  validatePhone,
  validateRequiredText,
  validateYearsExperience,
} from "@/lib/formValidation";
import { getMailConfig } from "@/lib/mail";
import { ingestFormRow } from "@/lib/sheetIngest";

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const required = [
    "fullName",
    "email",
    "phone",
    "employer",
    "jobTitle",
    "specialization",
    "yearsExperience",
    "preferredRole",
    "linkedin",
  ] as const;

  const fields: Record<string, string> = {};
  for (const key of required) {
    const val = form.get(key);
    if (typeof val !== "string" || !val.trim()) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
    fields[key] = val.trim();
  }

  const portfolio =
    typeof form.get("portfolio") === "string" ? (form.get("portfolio") as string).trim() : "";
  const message = typeof form.get("message") === "string" ? (form.get("message") as string).trim() : "";

  const errName = validateRequiredText(fields.fullName, "Full name", 2, 120);
  if (errName) return NextResponse.json({ error: errName }, { status: 400 });

  const errEmail = validateEmail(fields.email);
  if (errEmail) return NextResponse.json({ error: errEmail }, { status: 400 });

  const errPhone = validatePhone(fields.phone);
  if (errPhone) return NextResponse.json({ error: errPhone }, { status: 400 });

  const errEmployer = validateRequiredText(fields.employer, "Employer / organization", 2, 200);
  if (errEmployer) return NextResponse.json({ error: errEmployer }, { status: 400 });

  const errJob = validateRequiredText(fields.jobTitle, "Job title", 2, 120);
  if (errJob) return NextResponse.json({ error: errJob }, { status: 400 });

  const errSpec = validateRequiredText(fields.specialization, "Specialization", 2, 200);
  if (errSpec) return NextResponse.json({ error: errSpec }, { status: 400 });

  const errYears = validateYearsExperience(fields.yearsExperience);
  if (errYears) return NextResponse.json({ error: errYears }, { status: 400 });

  const errRole = validateRequiredText(fields.preferredRole, "Preferred role", 2, 120);
  if (errRole) return NextResponse.json({ error: errRole }, { status: 400 });

  const errLi = validateLinkedIn(fields.linkedin);
  if (errLi) return NextResponse.json({ error: errLi }, { status: 400 });

  const errPf = validateOptionalUrl(portfolio, "Portfolio / GitHub");
  if (errPf) return NextResponse.json({ error: errPf }, { status: 400 });

  if (message.length > 4000) {
    return NextResponse.json({ error: "Notes must be at most 4000 characters." }, { status: 400 });
  }

  const resume = form.get("resume");
  if (!(resume instanceof File)) {
    return NextResponse.json({ error: "Resume file is required." }, { status: 400 });
  }
  if (resume.size === 0) {
    return NextResponse.json({ error: "Resume file is empty." }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: "Resume exceeds maximum size (8 MB)." }, { status: 413 });
  }

  const mail = getMailConfig();
  if (!mail.ok) {
    return NextResponse.json({ error: mail.message }, { status: 503 });
  }

  const buffer = Buffer.from(await resume.arrayBuffer());
  const safeName = resume.name.replace(/[^\w.\-()+ ]/g, "_").slice(0, 180) || "resume";

  const html = `
    <h2>Careers application</h2>
    <p><strong>Name:</strong> ${escapeHtml(fields.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(fields.phone)}</p>
    <p><strong>Current employer:</strong> ${escapeHtml(fields.employer)}</p>
    <p><strong>Current title:</strong> ${escapeHtml(fields.jobTitle)}</p>
    <p><strong>Specialization:</strong> ${escapeHtml(fields.specialization)}</p>
    <p><strong>Years of experience:</strong> ${escapeHtml(fields.yearsExperience)}</p>
    <p><strong>Preferred role:</strong> ${escapeHtml(fields.preferredRole)}</p>
    <p><strong>LinkedIn:</strong> ${escapeHtml(fields.linkedin)}</p>
    <p><strong>Portfolio / GitHub:</strong> ${portfolio ? escapeHtml(portfolio) : "—"}</p>
    ${
      message
        ? `<p><strong>Notes:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>`
        : ""
    }
  `;

  const { error } = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: fields.email,
    subject: `[Xeroura website] Careers: ${fields.fullName} — ${fields.preferredRole}`,
    html,
    attachments: [{ filename: safeName, content: buffer }],
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send application. Please try again later." },
      { status: 502 },
    );
  }

  const submittedAt = new Date().toISOString();
  await ingestFormRow({
    form: "careers",
    submittedAt,
    fullName: fields.fullName,
    email: fields.email,
    phone: fields.phone,
    employer: fields.employer,
    jobTitle: fields.jobTitle,
    specialization: fields.specialization,
    yearsExperience: fields.yearsExperience,
    preferredRole: fields.preferredRole,
    linkedin: fields.linkedin,
    portfolio,
    message,
    resumeFileName: safeName,
  });

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
