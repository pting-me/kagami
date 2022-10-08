import esbuild from 'esbuild';
import alias from 'esbuild-plugin-alias';
import path from 'path';
import yargs from 'yargs';

// Adapted from Rollup
// https://github.com/rollup/rollup/blob/69ff4181e701a0fe0026d0ba147f31bc86beffa8/cli/run/index.ts

const environment =
  (yargs(process.argv).argv['environment'] as string | undefined) ?? '';
const env: Record<string, string> = {};

environment.split(',').forEach((pair: string) => {
  const [key, ...value] = pair.split(':');
  env[key] = value.length === 0 ? String(true) : value.join(':');
});

const plugins = [];

if (env.BUILD === 'production') {
  plugins.push(
    alias({
      './environments/environment': path.resolve(
        __dirname,
        'src/environments/environment.prod.ts'
      ),
    })
  );
}

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    outdir: path.resolve(__dirname, '../../dist/figma-plugin'),
    bundle: true,
    sourcemap: true,
    minify: false,
    format: 'iife',
    target: ['chrome58', 'firefox57', 'safari11'],
    define: {
      // Handlebars uses window object
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      window: 'globalThis',
    },
    platform: 'node',
    plugins,
  })
  .catch(() => process.exit(1));
