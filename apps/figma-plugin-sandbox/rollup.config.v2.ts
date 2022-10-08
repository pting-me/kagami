/**
 * This should be the ideal way of using rollup and esbuild
 * Having trouble with adding handlebars since it uses `fs` and
 * we're outputting to the browser, not node.
 */
import alias, { Alias } from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import { string } from 'rollup-plugin-string';

import { getAliasEntries } from '../../tools/build/vite.utils';

const envEntries: Alias[] = [];

if (process.env.BUILD === 'production') {
  envEntries.push({
    find: './environments/environment',
    replacement: './environments/environment.prod',
  });
}

export default {
  input: path.resolve(__dirname, 'src/main.ts'),
  output: {
    file: path.resolve(__dirname, '../../dist/figma-plugin/main.js'),
    format: 'iife',
    sourcemap: true,
  },
  acorn: {
    allowHashBang: true,
  },
  plugins: [
    alias({
      entries: [
        ...getAliasEntries(path.resolve(__dirname, '../..')),
        ...envEntries,
        // {
        //   find: 'prettier/typescript',
        //   replacement: path.resolve(
        //     __dirname,
        //     '../../node_modules/prettier/parser-typescript.js'
        //   ),
        // },
        // {
        //   find: /^prettier$/,
        //   replacement: path.resolve(
        //     __dirname,
        //     '../../node_modules/prettier/bin-prettier.js'
        //   ),
        // },
      ],
    }),
    // resolve({
    //   modulePaths: [path.resolve(__dirname, '../../node_modules')],
    //   preferBuiltins: false,
    // }),
    // json(),
    // replace({
    //   delimiters: ['', ''],
    //   '#!/usr/bin/env node': '',
    // }),
    // commonjs(),
    esbuild({
      tsconfig: path.resolve(__dirname, 'tsconfig.app.json'),
      // include: path.resolve(__dirname, '../../node_modules'),
      // exclude: '',
      target: 'es2022',
      // define: {
      //   '#!/usr/bin/env node': '',
      // },
      loaders: {
        '.json': 'json',
      },
      optimizeDeps: {
        include: [
          'lodash.camelcase',
          'lodash.upperfirst',
          'handlebars',
          'prettier',
          'prettier/parser-typescript',
        ],
        esbuildOptions: {
          nodePaths: [path.resolve(__dirname, '../../node_modules')],
        },
      },
    }),
  ],
};
