const isStringLengthValid = (string, length) => string.length <= length;

const getNumbers = (string) => {
  const stringNumbers = string.toString().match(/\d/g) ?? [];

  if (stringNumbers.length === 0) {
    return 'В строке нет цифр';
  }

  return parseInt(stringNumbers.join(''), 10);
};

const isStringPalindrome = (string) => {
  const stringSymbols = string.toString().toLowerCase().match(/[а-я]/g) ?? [];

  if (stringSymbols.length === 0) {
    return 'В строке нет букв';
  }

  return stringSymbols.join('') === stringSymbols.reverse().join('');
};

export {isStringLengthValid, getNumbers, isStringPalindrome};
