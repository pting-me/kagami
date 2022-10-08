import parserTypescript from 'https://unpkg.com/prettier@2.7.1/esm/parser-typescript.mjs';
import prettier from 'https://unpkg.com/prettier@2.7.1/esm/standalone.mjs';

const formatWithPrettier = (fileContent: string) => {
  return prettier.format(fileContent, {
    singleQuote: true,
    parser: 'typescript',
    plugins: [parserTypescript],
  });
};

export default formatWithPrettier;
