import { Resend } from "resend";

export type MailConfig =
  | { ok: true; resend: Resend; to: string[]; from: string }
  | { ok: false; message: string };

/** Reads env; does not log secrets. */
export function getMailConfig(): MailConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toRaw = process.env.MAIL_TO?.trim();
  const from = process.env.MAIL_FROM?.trim();

  if (!apiKey || !toRaw || !from) {
    return {
      ok: false,
      message:
        "Email is not configured. Add RESEND_API_KEY, MAIL_TO, and MAIL_FROM to your environment (e.g. .env.local or Vercel).",
    };
  }

  const to = toRaw.split(",").map((e) => e.trim()).filter(Boolean);
  if (to.length === 0) {
    return { ok: false, message: "MAIL_TO must contain at least one email address." };
  }

  return { ok: true, resend: new Resend(apiKey), to, from };
}
