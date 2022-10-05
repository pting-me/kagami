import fs from 'fs';
import path from 'path';

const xmlFile = fs.readFileSync(
  path.resolve(__dirname, '../assets/figma-tokens--light.xml'),
  'utf8'
);

const tokens = [...xmlFile.matchAll(/figma-color-([a-z\-]+)/g)].map(
  // we only want the capture group
  (matchArray) => matchArray[1]
);

const colors = {};

tokens?.forEach((token) => {
  const sections = token.split('-');

  // first section isn't need (bg, text, etc)
  let combinedSection = `${sections.shift()}-`;
  let flag = colors;

  sections.forEach((section, index) => {
    combinedSection += `${section}-`;

    // convert existing style to DEFAULT
    if (typeof flag[section] === 'string' && index < sections.length - 1) {
      const style = flag[section];
      flag[section] = {
        DEFAULT: `var(--figma-color-${combinedSection.replace(/-$/, '')})`,
      };
    } else if (typeof flag[section] === 'undefined') {
      if (index === sections.length - 1) {
        flag[section] = `var(--figma-color-${token})`;
      } else {
        flag[section] = {};
      }
    }

    flag = flag[section];
  });
});
