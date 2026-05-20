import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleSubmission } from "../lib/submission";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Basic CORS — restrict to same-origin in production by removing this block.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  const result = await handleSubmission("apply", body);
  if (!result.ok) {
    res.status(400).json(result);
    return;
  }
  res.status(200).json(result);
}
