/**
 * Optional: POST JSON to a Google Apps Script “Web app” URL that appends rows to your sheet.
 * Set GOOGLE_SHEETS_WEB_APP_URL (and optionally GOOGLE_SHEETS_WEB_APP_SECRET) in the environment.
 * Copy `scripts/google-sheets-form-ingest.gs` into the spreadsheet’s Apps Script project, deploy
 * as web app, paste the URL here. Failures are logged only; email sending is unchanged.
 */
export async function ingestFormRow(fields: Record<string, string>): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();
  if (!url) return;

  const secret = process.env.GOOGLE_SHEETS_WEB_APP_SECRET?.trim();
  const payload = { ...fields, ...(secret ? { secret } : {}) };

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 12_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    if (!res.ok) {
      console.error("[sheetIngest] non-OK response", res.status);
    }
  } catch (e) {
    console.error("[sheetIngest]", e);
  } finally {
    clearTimeout(timer);
  }
}
