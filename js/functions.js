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

const getDayMinutes = (time) => {
  const dayMinutes = time.split(':')
    .map((item) => parseInt(item, 10))
    .reduce((minutes, item, index) => index === 0 ? minutes + item * 60 : minutes + item, 0);

  return dayMinutes;
};

const isMeetingInWorkTime = (workStartTime, workEndTime, meetingStartTime, meetingDuration) => {
  const isInWorkTime = getDayMinutes(workStartTime) <= getDayMinutes(meetingStartTime) &&
    getDayMinutes(meetingStartTime) + meetingDuration <= getDayMinutes(workEndTime);

  return isInWorkTime;
};

export {isStringLengthValid, getNumbers, isStringPalindrome, isMeetingInWorkTime};
