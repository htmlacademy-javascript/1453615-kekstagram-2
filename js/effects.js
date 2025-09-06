const INITIAL_EFFECT = 'none';

const Effects = {
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
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageEffectControlElement = document.querySelector('.img-upload__effect-level');
const imageEffectSliderElement = document.querySelector('.effect-level__slider');
const imageEffectLevelValue = document.querySelector('.effect-level__value');

imageEffectControlElement.classList.add('hidden');

noUiSlider.create(imageEffectSliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setEffect = (name) => {
  const {filter, unit} = Effects[name].settings;

  imageEffectControlElement.classList.toggle('hidden', name === 'none');

  imageEffectSliderElement.noUiSlider.updateOptions(Effects[name].settings);

  imageEffectSliderElement.noUiSlider.on('update', () => {
    imageEffectLevelValue.value = imageEffectSliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = name === INITIAL_EFFECT ? `${filter}` : `${filter}(${imageEffectLevelValue.value}${unit})`;
    imagePreviewElement.className = name === INITIAL_EFFECT ? '' : `effects__preview--${name}`;
  });
};

const onImageUploadEffectChange = (evt) => {
  setEffect(evt.target.value);
};

export {onImageUploadEffectChange};
