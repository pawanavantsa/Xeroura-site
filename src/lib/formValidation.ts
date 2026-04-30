/** Practical RFC 5322–style check; rejects obvious typos and oversize strings. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "Email is required.";
  if (s.length > 254) return "Email is too long.";
  if (!EMAIL_RE.test(s)) return "Enter a valid email address.";
  const [local, domain] = s.split("@");
  if (!local || !domain || local.length > 64 || local.startsWith(".") || local.endsWith(".")) {
    return "Enter a valid email address.";
  }
  return null;
}

/** 10–15 digits after stripping formatting; allows +country codes. */
export function validatePhone(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "Phone number is required.";
  const digits = s.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return "Enter a valid phone number (10–15 digits, including country code if applicable).";
  }
  return null;
}

export function validateLinkedIn(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "LinkedIn profile URL is required.";
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (host !== "linkedin.com") {
      return "Enter a valid LinkedIn URL (must be on linkedin.com).";
    }
    const path = u.pathname.toLowerCase();
    if (!path.includes("/in/") && !path.includes("/company/")) {
      return "Use a profile or company link, e.g. linkedin.com/in/yourname or linkedin.com/company/…";
    }
    const slug = path.includes("/in/")
      ? path.split("/in/")[1]?.split("/")[0]?.replace(/\/$/, "")
      : path.split("/company/")[1]?.split("/")[0]?.replace(/\/$/, "");
    if (!slug || slug.length < 2) {
      return "LinkedIn URL must include the profile or company name after /in/ or /company/.";
    }
    return null;
  } catch {
    return "Enter a valid LinkedIn URL.";
  }
}

/** Optional URL: empty ok; otherwise must parse as http(s). */
export function validateOptionalUrl(raw: string, label: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    if (!["http:", "https:"].includes(u.protocol)) return `Enter a valid ${label} URL.`;
    return null;
  } catch {
    return `Enter a valid ${label} URL.`;
  }
}

export function validateYearsExperience(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "Years of experience is required.";
  if (!/^\d+(\.\d+)?$/.test(s)) return "Enter years as a number (e.g. 3 or 4.5).";
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0 || n > 60) return "Years of experience must be between 0 and 60.";
  return null;
}

export function validateRequiredText(raw: string, label: string, min: number, max: number): string | null {
  const s = raw.trim();
  if (!s) return `${label} is required.`;
  if (s.length < min) return `${label} must be at least ${min} characters.`;
  if (s.length > max) return `${label} must be at most ${max} characters.`;
  return null;
}
