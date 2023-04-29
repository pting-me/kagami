const esbuild = require("esbuild");
const path = require("node:path");
const yargs = require("yargs");

const isDev = yargs.argv.mode === "dev";

esbuild
  .build({
    entryPoints: ["src/main.ts"],
    outdir: path.resolve(__dirname, "../../dist"),
    bundle: true,
    sourcemap: isDev,
    minify: !isDev,
    format: "iife",
    target: ["chrome58", "safari11"],
    platform: "node",
  })
  .catch(() => process.exit(1));
