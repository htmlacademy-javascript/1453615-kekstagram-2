const ImageScaleSetting = {
  INITIAL: 100,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const imageScalerOutputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

imageScalerOutputElement.value = ImageScaleSetting.INITIAL;

const getScaleDirection = (isUp) => {
  const scaleCoefficient = isUp ? 1 : -1;

  const changeUploadScalerValue = (currentValue) => {
    const changedValue = currentValue + ImageScaleSetting.STEP * scaleCoefficient;

    if (changedValue > ImageScaleSetting.MAX || changedValue < ImageScaleSetting.MIN) {
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

export {ImageScaleSetting, onImageScalerClick};
