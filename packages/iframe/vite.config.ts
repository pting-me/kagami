import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "dev";

  return {
    plugins: [react(), viteSingleFile()],
    server: { port: 31337 },
    build: {
      minify: isDev ? false : "esbuild",
      emptyOutDir: false,
      outDir: fileURLToPath(
        new URL(`../../dist/${isDev ? "dev" : "prod"}/`, import.meta.url)
      ),
    },
  };
});
