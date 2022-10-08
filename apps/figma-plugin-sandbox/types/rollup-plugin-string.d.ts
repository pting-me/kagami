declare module 'rollup-plugin-string' {
  import { TransformHook } from 'rollup';

  interface StringOptions {
    include?: Array<string | RegExp> | string | RegExp | null;
    exclude?: Array<string | RegExp> | string | RegExp | null;
  }

  interface StringReturns {
    name: string;
    transform: TransformHook;
  }

  export function string(opts?: StringOptions): StringReturns;
}
