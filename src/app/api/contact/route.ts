import { NextResponse } from "next/server";
import { validateEmail, validateRequiredText } from "@/lib/formValidation";
import { getMailConfig } from "@/lib/mail";
import { ingestFormRow } from "@/lib/sheetIngest";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const nameErr = validateRequiredText(body.name ?? "", "Name", 2, 120);
  if (nameErr) return NextResponse.json({ error: nameErr }, { status: 400 });

  const emailErr = validateEmail(body.email ?? "");
  if (emailErr) return NextResponse.json({ error: emailErr }, { status: 400 });

  const companyRaw = typeof body.company === "string" ? body.company.trim() : "";
  if (companyRaw.length > 200) {
    return NextResponse.json({ error: "Company must be at most 200 characters." }, { status: 400 });
  }

  const msgErr = validateRequiredText(body.message ?? "", "Message", 10, 8000);
  if (msgErr) return NextResponse.json({ error: msgErr }, { status: 400 });

  const mail = getMailConfig();
  if (!mail.ok) {
    return NextResponse.json({ error: mail.message }, { status: 503 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const company = companyRaw || "—";
  const message = body.message!.trim();

  const html = `
    <h2>Website contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `;

  const { error } = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: email,
    subject: `[Xeroura website] Contact from ${name}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send email. Please try again later." },
      { status: 502 },
    );
  }

  const submittedAt = new Date().toISOString();
  await ingestFormRow({
    form: "contact",
    submittedAt,
    name,
    email,
    company: companyRaw,
    message,
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
