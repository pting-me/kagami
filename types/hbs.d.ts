/**
 * Handlebars, since rollup doesn't recognize
 */
declare module '*.hbs' {
  const content: string;
  export default content;
}
