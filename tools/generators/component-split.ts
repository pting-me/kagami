import fs from 'fs';
import path from 'path';

const componentFile = fs.readFileSync(
  path.resolve(__dirname, '../../tmp/handlebars/component.tmp'),
  'utf8'
);

const fileNames = [
  ...componentFile.matchAll(/^\/\*\s*BEGIN_FILE:\s*([^\s*]+)\s*\*\/$/gm),
].map(
  // we only want the capture group
  (matchArray) => matchArray[1]
);

// This is the same as above, except we're not using the capture group
const fileContents = componentFile.split(
  /^\/\*\s*BEGIN_FILE:\s*(?:[^\s*]+)\s*\*\/$\n/gm
);
fileContents.shift();
fileContents.forEach((content, index) => {
  fs.writeFileSync(
    path.resolve(__dirname, `../../dist/hashi-components/${fileNames[index]}`),
    content
  );
});
