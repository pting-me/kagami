import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

import { aliasEntries } from '../../vite.utils';

export default {
  input: path.resolve(__dirname, 'src/main.ts'),
  output: {
    file: path.resolve(__dirname, '../../dist/figma-plugin/main.js'),
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: aliasEntries,
    }),
    resolve(),
    commonjs(),
    esbuild({ tsconfig: path.resolve(__dirname, 'tsconfig.app.json') }),
  ],
};
