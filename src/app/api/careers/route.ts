import { NextResponse } from "next/server";
import { getMailConfig } from "@/lib/mail";

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
  ] as const;

  const fields: Record<string, string> = {};
  for (const key of required) {
    const val = form.get(key);
    if (typeof val !== "string" || !val.trim()) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
    fields[key] = val.trim();
  }

  const linkedin = typeof form.get("linkedin") === "string" ? (form.get("linkedin") as string).trim() : "";
  const portfolio =
    typeof form.get("portfolio") === "string" ? (form.get("portfolio") as string).trim() : "";
  const message = typeof form.get("message") === "string" ? (form.get("message") as string).trim() : "";

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
    <p><strong>LinkedIn:</strong> ${linkedin ? escapeHtml(linkedin) : "—"}</p>
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

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
