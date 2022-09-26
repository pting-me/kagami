import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import path from 'path';
import tsconfig from '../../tsconfig.base.json';

const mapAliasEntries = (paths: typeof tsconfig.compilerOptions.paths) => {
  const pathEntries = Object.entries(paths);
  // assumes 1-1 relationship with paths in tsconfig
  return pathEntries.map(([alias, [currentPath]]) => ({
    find: alias,
    replacement: path.resolve(`../../${currentPath}`),
  }));
};

export default {
  input: path.resolve(__dirname, 'src/main.ts'),
  output: {
    file: path.resolve(__dirname, '../../dist/figma-plugin/main.js'),
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: mapAliasEntries(tsconfig.compilerOptions.paths),
    }),
    resolve(),
    commonjs(),
    esbuild({ tsconfig: path.resolve(__dirname, 'tsconfig.app.json') }),
  ],
};
