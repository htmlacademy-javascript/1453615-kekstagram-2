const getRandomInt = (min, max) => {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomInt(0, items.length - 1);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

const isStringLengthValid = (string, length) => string.length > length;

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeModal = (modalElement) => {
  modalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const openModal = (modalElement) => {
  modalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const stopEscapeOnFocus = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInt,
  shuffleArray,
  isStringLengthValid,
  isEscapeKey,
  openModal,
  closeModal,
  stopEscapeOnFocus,
  debounce
};
