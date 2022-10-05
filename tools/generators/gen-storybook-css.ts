import fs from 'fs';
import path from 'path';

const xmlFile = fs.readFileSync(
  path.resolve(__dirname, '../assets/figma-tokens--light.xml'),
  'utf8'
);

const tokens = [
  ...xmlFile.matchAll(/(--figma-color-[a-z\-]+)<span>([^<]+)\<\/span/g),
].map((group) => {
  return `  ${group[1]}: ${group[2]};`;
});

const fileContent = [':root {', ...tokens, '}\n'].join('\n');

fs.writeFileSync(
  path.resolve(__dirname, './light-theme-tokens.css'),
  fileContent,
  'utf8'
);
