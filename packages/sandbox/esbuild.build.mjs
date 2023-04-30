import { fileURLToPath } from "node:url";

import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/main.ts"],
    outdir: fileURLToPath(new URL("../../dist/prod", import.meta.url)),
    bundle: true,
    sourcemap: false,
    minify: true,
    format: "iife",
    target: ["chrome58", "safari11"],
    platform: "node",
  })
  .catch(() => process.exit(1));
