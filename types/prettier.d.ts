/**
 * For importing Prettier externally
 */
declare module 'https://unpkg.com/prettier@2.7.1/esm/standalone.mjs' {
  export * from 'prettier';
}

declare module 'https://unpkg.com/prettier@2.7.1/esm/parser-typescript.mjs' {
  import parserTs from 'prettier/parser-typescript';
  const content: typeof parserTs;
  export default content;
}
