import { NextResponse } from "next/server";
import { getMailConfig } from "@/lib/mail";

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

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const mail = getMailConfig();
  if (!mail.ok) {
    return NextResponse.json({ error: mail.message }, { status: 503 });
  }

  const company = body.company?.trim() || "—";
  const html = `
    <h2>Website contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name.trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email.trim())}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(body.message.trim())}</pre>
  `;

  const { error } = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: body.email.trim(),
    subject: `[Xeroura website] Contact from ${body.name.trim()}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send email. Please try again later." },
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
