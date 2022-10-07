/**
 * Remove quotes DocGen preserves quotes for strings
 */
const stripQuotes = (defaultValue: string) => {
  const isQuote = (char: string) => {
    if (char.length !== 1) {
      return false;
    }
    return char === "'" || char === '"';
  };

  const { length } = defaultValue;

  if (
    isQuote(defaultValue[0]) &&
    defaultValue[0] === defaultValue[length - 1]
  ) {
    return defaultValue.slice(1, -1);
  }

  return defaultValue;
};

export default stripQuotes;
