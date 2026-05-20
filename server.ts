/**
 * Apex Circle — Zo Site server.
 *
 * This file is for the Zo deployment (Bun + Hono + Vite dev middleware).
 * Vercel uses /api/*.ts functions instead — see api/apply.ts, api/enquire.ts.
 *
 * Both paths share business logic from /lib/submission.ts so behaviour
 * stays identical across hosts.
 */

import { serveStatic } from "hono/bun";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import config from "./zosite.json";
import { Hono } from "hono";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { handleSubmission, type Kind } from "./lib/submission";

type Mode = "development" | "production";
const app = new Hono();

const mode: Mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

const SUBMISSIONS_DIR = "/home/workspace/apex-circle/submissions";

await mkdir(SUBMISSIONS_DIR, { recursive: true }).catch(() => {});

async function saveSubmissionToDisk(kind: Kind, payload: Record<string, unknown>, receivedAt: string) {
  try {
    const slug = receivedAt.replace(/[:.]/g, "-");
    const file = `${SUBMISSIONS_DIR}/${slug}_${kind}.json`;
    await writeFile(
      file,
      JSON.stringify({ kind, receivedAt, payload }, null, 2),
    );
    await appendFile(
      `${SUBMISSIONS_DIR}/submissions.jsonl`,
      JSON.stringify({ kind, receivedAt, payload }) + "\n",
    );
    return file.split("/").pop()!;
  } catch (e) {
    console.error("Failed to persist submission:", e);
    return null;
  }
}

async function handleZoSubmission(kind: Kind, body: Record<string, unknown>) {
  const result = await handleSubmission(kind, body);
  if (!result.ok) return { status: 400, body: result };
  const savedAs = await saveSubmissionToDisk(kind, body, result.receivedAt!);
  return { status: 200, body: { ...result, savedAs } };
}

/* ----- API routes ----- */
app.get("/api/hello-zo", (c) => c.json({ msg: "Hello from Apex Circle" }));

app.post("/api/apply", async (c) => {
  let body: Record<string, any>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const r = await handleZoSubmission("apply", body);
  return c.json(r.body, r.status as 200 | 400);
});

app.post("/api/enquire", async (c) => {
  let body: Record<string, any>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const r = await handleZoSubmission("enquire", body);
  return c.json(r.body, r.status as 200 | 400);
});

/* ----- Static + frontend ----- */
if (mode === "production") {
  app.use("/assets/*", serveStatic({ root: "./dist" }));
  app.use(
    "/*",
    serveStatic({
      root: "./dist",
      onFound: (_path, c) => {
        c.header("Cache-Control", "no-store, must-revalidate");
      },
    }),
  );
  app.get("/*", async (c) => {
    return c.html(await Bun.file("./dist/index.html").text());
  });
} else {
  const vite = await setupVite();
  app.all("*", async (c) => {
    try {
      const url = new URL(c.req.url).pathname;
      const result = await vite.ssrLoadModule(url).catch(() => null);
      if (result) {
        return c.json(result);
      }
      let template = await Bun.file("./index.html").text();
      template = await vite.transformIndexHtml(url, template);
      return c.html(template, { headers: { "Cache-Control": "no-store, must-revalidate" } });
    } catch (e) {
      console.error(e);
      return c.text("Internal Server Error", 500);
    }
  });
}

console.log(`Started ${mode} server: http://localhost:${config.local_port}`);

export default {
  port: config.local_port,
  fetch: app.fetch,
};

async function setupVite() {
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });

  app.all("*", async (c) => {
    try {
      const url = new URL(c.req.url).pathname;
      if (url.startsWith("/@") || url.startsWith("/node_modules/") || url.startsWith("/src/") || url.includes(".")) {
        let result;
        try {
          result = await vite.transformRequest(url);
        } catch {
          result = null;
        }
        if (result) {
          return new Response(result.code, {
            headers: {
              "Content-Type": "application/javascript",
              "Cache-Control": "no-store, must-revalidate",
            },
          });
        }
      }
      let template = await Bun.file("./index.html").text();
      template = await vite.transformIndexHtml(url, template);
      return c.html(template, { headers: { "Cache-Control": "no-store, must-revalidate" } });
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error(error);
      return c.text("Internal Server Error", 500);
    }
  });
  return vite;
}
