import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One status update, posted the moment the laptop lid goes down.
const LINE =
  "The fan stopped first. Then the light under the lid went out, and my last tab is still open on a page no one will read.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the line");
}
console.log(`wrote ${outPath} (${chars.length} characters)`);
