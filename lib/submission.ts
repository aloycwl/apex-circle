/**
 * Apex Circle — shared submission handler.
 *
 * Used by:
 *   - Zo (server.ts → Hono)
 *   - Vercel (api/apply.ts, api/enquire.ts → @vercel/node)
 *
 * Email delivery uses Resend (https://resend.com). Set RESEND_API_KEY in env.
 * If the key is missing, the submission is still validated and returned OK
 * with emailed=false. On Zo, server.ts also saves a copy to disk.
 */

import { Resend } from "resend";

export type Kind = "apply" | "enquire";

export type SubmissionResult = {
  ok: boolean;
  emailed: boolean;
  error?: string;
  receivedAt?: string;
};

const RECIPIENT_EMAIL =
  process.env.APEX_NOTIFY_EMAIL || "aloycwl@gmail.com";

// Sender. Until a custom domain is verified in Resend, use Resend's sandbox.
// Once you verify e.g. apexcirclesg.com in Resend, set
// APEX_FROM_EMAIL="Apex Circle <hello@apexcirclesg.com>".
const FROM_EMAIL =
  process.env.APEX_FROM_EMAIL || "Apex Circle <onboarding@resend.dev>";

const APPLY_REQUIRED = ["fullName", "email", "company", "tier", "why"] as const;
const ENQUIRE_REQUIRED = ["name", "email", "message"] as const;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRows(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      const value = escapeHtml(String(v)).replace(/\n/g, "<br>");
      return `<tr><td style="padding:8px 14px;background:#0f0e0c;color:#c8a25b;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #2a2620;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 14px;color:#f5efe2;font-family:Inter,system-ui,sans-serif;font-size:14px;border-bottom:1px solid #2a2620">${value}</td></tr>`;
    })
    .join("");
}

function renderEmail(kind: Kind, payload: Record<string, unknown>): { subject: string; html: string; text: string } {
  const isApply = kind === "apply";
  const heading = isApply ? "New Membership Application" : "New Enquiry";
  const subjectLine = isApply
    ? `Apex Circle · Application — ${payload.fullName ?? "Unknown"} (${payload.company ?? "—"})`
    : `Apex Circle · Enquiry — ${payload.name ?? "Unknown"}`;

  const rows = renderRows(payload);
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#08070a;font-family:Inter,system-ui,sans-serif">
<div style="max-width:640px;margin:0 auto;background:#131210;border:1px solid #2a2620;border-radius:14px;overflow:hidden">
<div style="padding:28px 32px;background:linear-gradient(180deg,#1a1814,#131210);border-bottom:1px solid #2a2620">
<p style="margin:0 0 8px;color:#c8a25b;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase">Apex Circle · Council Inbox</p>
<h1 style="margin:0;color:#f5efe2;font-family:'Playfair Display',serif;font-size:24px;font-weight:600">${heading}</h1>
</div>
<table style="width:100%;border-collapse:collapse">${rows}</table>
<div style="padding:18px 32px;background:#0f0e0c;color:#7a7468;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase">
Received ${new Date().toISOString()}
</div>
</div></body></html>`;

  const text =
    `${heading}\n\n` +
    Object.entries(payload)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n") +
    `\n\nReceived ${new Date().toISOString()}`;

  return { subject: subjectLine, html, text };
}

function validate(kind: Kind, payload: Record<string, unknown>): string | null {
  const required = kind === "apply" ? APPLY_REQUIRED : ENQUIRE_REQUIRED;
  for (const key of required) {
    const v = payload[key];
    if (v === undefined || v === null || String(v).trim() === "") {
      return `Missing required field: ${key}`;
    }
  }
  const email = String(payload.email || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export async function sendEmail(kind: Kind, payload: Record<string, unknown>): Promise<{ emailed: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { emailed: false, error: "RESEND_API_KEY not configured" };
  }
  try {
    const resend = new Resend(key);
    const { subject, html, text } = renderEmail(kind, payload);
    const replyEmail = String(payload.email || "");
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: replyEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail) ? replyEmail : undefined,
      subject,
      html,
      text,
    });
    if (error) {
      return { emailed: false, error: String(error.message || error) };
    }
    return { emailed: true };
  } catch (e) {
    return { emailed: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function handleSubmission(
  kind: Kind,
  payload: Record<string, unknown>,
): Promise<SubmissionResult> {
  const err = validate(kind, payload);
  if (err) {
    return { ok: false, emailed: false, error: err };
  }
  const receivedAt = new Date().toISOString();
  console.log(`[apex-${kind}] received from ${payload.email} at ${receivedAt}`);
  const { emailed, error } = await sendEmail(kind, payload);
  if (!emailed) {
    console.warn(`[apex-${kind}] email not sent: ${error}`);
  }
  return { ok: true, emailed, error, receivedAt };
}
