const esbuild = require("esbuild");
const path = require("node:path");

esbuild
  .build({
    entryPoints: ["src/main.ts"],
    outdir: path.resolve(__dirname, "../../dist"),
    bundle: true,
    sourcemap: true,
    minify: false,
    format: "iife",
    target: ["chrome58", "safari11"],
    platform: "node",
  })
  .catch(() => process.exit(1));
