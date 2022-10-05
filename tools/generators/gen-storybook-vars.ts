import fs from 'fs';
import path from 'path';

const xmlFile = fs.readFileSync(
  path.resolve(__dirname, '../assets/figma-tokens--dark.xml'),
  'utf8'
);

const tokens = [
  ...xmlFile.matchAll(/(--figma-color-[a-z\-]+)<span>([^<]+)\<\/span/g),
].map((group) => {
  return {
    key: group[1],
    value: group[2],
  };
});

fs.writeFileSync(
  path.resolve(__dirname, './dark-theme-tokens.ts'),
  `const tokens=${JSON.stringify(tokens)};export default tokens;`,
  'utf8'
);
