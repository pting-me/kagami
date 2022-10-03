import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

import { getAliasEntries } from '../../tools/build/vite.utils';

export default {
  input: path.resolve(__dirname, 'src/main.ts'),
  output: {
    file: path.resolve(__dirname, '../../dist/figma-plugin/main.js'),
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: getAliasEntries(path.resolve(__dirname, '../..')),
    }),
    resolve(),
    commonjs(),
    esbuild({ tsconfig: path.resolve(__dirname, 'tsconfig.app.json') }),
  ],
};
