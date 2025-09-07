import {ImageScale} from './config.js';

const imageScalerOutputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

imageScalerOutputElement.value = ImageScale.INITIAL;

const getScaleDirection = (isUp) => {
  const scaleCoefficient = isUp ? 1 : -1;

  const changeUploadScalerValue = (currentValue) => {
    const changedValue = currentValue + ImageScale.STEP * scaleCoefficient;

    if (changedValue > ImageScale.MAX || changedValue < ImageScale.MIN) {
      return currentValue;
    }

    return changedValue;
  };

  return changeUploadScalerValue;
};

const changeScaleUp = getScaleDirection(false);
const changeScaleDown = getScaleDirection(true);

const onImageScalerClick = (evt) => {
  const scaleUpButton = evt.target.closest('.scale__control--smaller');
  const scaleDownButton = evt.target.closest('.scale__control--bigger');
  let currentScaleValue = +imageScalerOutputElement.value;

  if (scaleUpButton) {
    currentScaleValue = changeScaleUp(currentScaleValue);
  }

  if (scaleDownButton) {
    currentScaleValue = changeScaleDown(currentScaleValue);
  }

  imageScalerOutputElement.value = currentScaleValue;
  imagePreviewElement.style.transform = `scale(${currentScaleValue / 100})`;
};

export {ImageScale, onImageScalerClick};
