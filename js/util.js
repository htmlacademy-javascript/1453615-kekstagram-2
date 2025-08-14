const getRandomInt = (min, max) => {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInt, isEscapeKey};
