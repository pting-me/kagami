export function camel(str: string): string {
  let result = "";
  let capitalizeNext = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isDelimiter = /[\s_]/.test(char);

    if (!isDelimiter) {
      if (capitalizeNext) {
        result += char.toUpperCase();
        capitalizeNext = false;
      } else {
        result += i === 0 ? char.toLowerCase() : char.toLowerCase();
      }
    } else if (i > 0 && !/[A-Z]/.test(str[i - 1])) {
      capitalizeNext = true;
    }
  }

  return result;
}

export function pascal(str: string): string {
  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isDelimiter = /[\s_]/.test(char);

    if (!isDelimiter) {
      if (capitalizeNext) {
        result += char.toUpperCase();
        capitalizeNext = false;
      } else {
        result += char.toLowerCase();
      }
    } else if (!/[A-Z]/.test(str[i - 1])) {
      capitalizeNext = true;
    }
  }

  return result;
}
