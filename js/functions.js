const isStringLengthValid = (string, length) => string.length <= length;

const getNumbers = (string) => {
  const stringNumbers = string.toString().match(/\d/g) ?? [];

  if (stringNumbers.length === 0) {
    return 'В строке нет цифр';
  }

  return parseInt(stringNumbers.join(''), 10);
};

const isStringPalindrom = (string) => {
  const stringSimbols = string.toString().toLowerCase().match(/[а-я]/g) ?? [];

  if (stringSimbols.length === 0) {
    return 'В строке нет букв';
  }

  return stringSimbols.join('') === stringSimbols.reverse().join('');
};

export {isStringLengthValid, getNumbers, isStringPalindrom};
