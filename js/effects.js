import {UserImageEffect} from './config.js';

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
  const {filter, unit} = UserImageEffect.FILTERS[name].settings;

  imageEffectControlElement.classList.toggle('hidden', name === 'none');

  imageEffectSliderElement.noUiSlider.updateOptions(UserImageEffect.FILTERS[name].settings);

  imageEffectSliderElement.noUiSlider.on('update', () => {
    imageEffectLevelValue.value = imageEffectSliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = name === UserImageEffect.INITIAL ? `${filter}` : `${filter}(${imageEffectLevelValue.value}${unit})`;
    imagePreviewElement.className = name === UserImageEffect.INITIAL ? '' : `effects__preview--${name}`;
  });
};

const onImageUploadEffectChange = (evt) => {
  setEffect(evt.target.value);
};

export {onImageUploadEffectChange};
