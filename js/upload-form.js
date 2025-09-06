import {closeModal, openModal, isEscapeKey} from './util.js';
import {hashtagsInputField, descriptionInputField} from './validate-fields.js';
import {imageUploadInputElement} from './upload-photo.js';
import {ImageScaleSetting, onImageScalerClick} from './scale.js';
import {onImageUploadEffectChange} from './effects.js';
// import {showAlert} from './alert.js';

const INITIAL_EFFECT = 'none';

const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageUploadCloseButtonElement = document.querySelector('.img-upload__cancel');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imageScalerOutputElement = document.querySelector('.scale__control--value');
const imageScalerElement = document.querySelector('.img-upload__scale');
const imageEffectsControlElements = document.querySelector('.img-upload__effects');
const imageEffectsControlElement = document.querySelector('.img-upload__effect-level');
const noneEffectControlElement = document.querySelector('#effect-none');

imageScalerElement.addEventListener('click', onImageScalerClick);
imageEffectsControlElements.addEventListener('change', onImageUploadEffectChange);

const resetImageUploadForm = () => {
  imageUploadInputElement.value = '';
  imagePreviewElement.removeAttribute('class');
  imageScalerOutputElement.value = ImageScaleSetting.INITIAL;
  imagePreviewElement.style = INITIAL_EFFECT;
  noneEffectControlElement.checked = true;
  imageEffectsControlElement.classList.add('hidden');
  hashtagsInputField.value = '';
  descriptionInputField.value = '';
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    resetImageUploadForm();
    closeModal(imageUploadOverlayElement);
    document.removeEventListener('keydown', onUploadEscapeKeydown);
  }
};

const onImageUploadChange = (evt) => {
  evt.preventDefault();
  openModal(imageUploadOverlayElement);
  document.addEventListener('keydown', onUploadEscapeKeydown);
};

const onUploadCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal(imageUploadOverlayElement);
  resetImageUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

imageUploadCloseButtonElement.addEventListener('click', onUploadCloseButtonClick);

export {onImageUploadChange};
