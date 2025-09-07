const Urls = {
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://31.javascript.htmlacademy.pro/kekstagram'
};

const Alert = {
  UPLOAD_SUCCESS: 'success',
  UPLOAD_ERROR: 'error',
  DATA_ERROR: 'data-error',
  TIMEOUT: 5000
};

const SubmitButtonText = {
  NORMAL: 'Опубликовать',
  SENDING: 'Публикуем...'
};

const TextField = {
  MAX_HASHTAGS_COUNT: 5,
  MAX_HASHTAG_SYMBOLS: 20,
  MAX_DESCRIPTION_SYMBOLS: 140
};

const ImageScale = {
  INITIAL: 100,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const Comments = {
  INITIAL_COUNT: 5,
  LOAD_STEP: 5,
  AVATAR_SIZE: '35'
};

const PicturesFilter = {
  RANDOM_PHOTOS_COUNT: 10,
  DEBOUNCE_DELAY: 500
};

const UserImageEffect = {
  INITIAL: 'none',
  FILTERS: {
    'none': {
      settings: {
        range: {
          min: 1,
          max: 100,
        },
        step: 1,
        start: 100,
        filter: '',
        unit: ''
      }
    },
    'chrome': {
      settings: {
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
        start: 1,
        filter: 'grayscale',
        unit: ''
      }
    },
    'sepia': {
      settings: {
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
        start: 1,
        filter: 'sepia',
        unit: ''
      }
    },
    'marvin': {
      settings: {
        range: {
          min: 0,
          max: 100
        },
        step: 1,
        start: 100,
        filter: 'invert',
        unit: '%'
      }
    },
    'phobos': {
      settings: {
        range: {
          min: 0,
          max: 3
        },
        step: 0.1,
        start: 3,
        filter: 'blur',
        unit: 'px'
      }
    },
    'heat': {
      settings: {
        range: {
          min: 1,
          max: 3
        },
        step: 0.1,
        start: 3,
        filter: 'brightness',
        unit: ''
      }
    }
  }
};

const UPLOAD_FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

export {
  Urls,
  Alert,
  SubmitButtonText,
  UPLOAD_FILES_TYPES,
  TextField,
  ImageScale,
  Comments,
  PicturesFilter,
  UserImageEffect
};
