import { fileURLToPath } from "node:url";

import esbuild from "esbuild";
import yargs from "yargs";

const isDev = yargs.argv.mode === "dev";

esbuild
  .build({
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
