import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleSubmission } from "../lib/submission.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const result = await handleSubmission("apply", body);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (e) {
    console.error("[apex-apply] handler crashed:", e);
    const msg = e instanceof Error ? e.message : String(e);
    res.status(500).json({ ok: false, error: `Server error: ${msg}` });
  }
}
