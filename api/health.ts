import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    service: "apex-circle",
    runtime: "vercel-node",
    nodeVersion: process.version,
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    notifyEmail: process.env.APEX_NOTIFY_EMAIL || "aloycwl@gmail.com (default)",
    timestamp: new Date().toISOString(),
  });
}
