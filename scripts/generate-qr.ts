/**
 * scripts/generate-qr.ts
 *
 * Reads BASE_URL from the environment and writes a set of QR‑code
 * images into `static/`, ready for SvelteKit to deploy.
 */

import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

/** Where the images end up (copied verbatim by SvelteKit) */
const outDir = path.resolve("static");

/** Absolute site URL – fill from SST at deploy time or .env locally */
const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";

/** Make as many codes as you like here */
const codes: { file: string; query: string }[] = [
  { file: "qr-invitation.png", query: "utm_source=wedding-invite" },
  { file: "qr-root.png", query: "" },
];

await fs.mkdir(outDir, { recursive: true });

for (const c of codes) {
  const url = `${BASE_URL}/?${c.query}`;
  const target = path.join(outDir, c.file);

  if (c.file.endsWith(".png")) {
    await QRCode.toFile(target, url, { width: 512 });
  } else if (c.file.endsWith(".svg")) {
    const svg = await QRCode.toString(url, { type: "svg" });
    await fs.writeFile(target, svg);
  }
  console.log("✓ generated", c.file, "→", url);
}
