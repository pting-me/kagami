import { fileURLToPath } from "node:url";

import esbuild from "esbuild";

const isDev = true;

const ctx = esbuild
  .context({
    entryPoints: ["src/main.ts"],
    outdir: fileURLToPath(new URL("../../dist", import.meta.url)),
    bundle: true,
    sourcemap: isDev,
    minify: !isDev,
    format: "iife",
    target: ["chrome58", "safari11"],
    platform: "node",
  })
  .catch(() => process.exit(1));

(await ctx).watch();

console.log("watching sandbox...");
