import {Alert, SubmitButtonText, UserImageEffect, ImageScale} from './config.js';
import {closeModal, openModal, isEscapeKey} from './util.js';
import {hashtagsInputField, descriptionInputField} from './validate-fields.js';
import {imageUploadInputElement} from './upload-photo.js';
import {onImageScalerClick} from './scale.js';
import {onImageUploadEffectChange} from './effects.js';
import {createRequest} from './fetch.js';
import {showAlert} from './alert.js';

const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageUploadCloseButtonElement = document.querySelector('.img-upload__cancel');

const imageUploadFormElement = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('#upload-submit');

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
  imageScalerOutputElement.value = ImageScale.INITIAL;
  imagePreviewElement.style = UserImageEffect.INITIAL;
  noneEffectControlElement.checked = true;
  imageEffectsControlElement.classList.add('hidden');
  hashtagsInputField.value = '';
  descriptionInputField.value = '';
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector(`.${Alert.UPLOAD_ERROR}`)) {
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

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = SubmitButtonText.NORMAL;
};

const onFormSuccessSubmit = () => {
  showAlert(Alert.UPLOAD_SUCCESS);
  closeModal(imageUploadOverlayElement);
  resetImageUploadForm();
  unblockSubmitButton();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

const onFormErrorSubmit = () => {
  showAlert(Alert.UPLOAD_ERROR);
  unblockSubmitButton();
};

const postUploadForm = () => createRequest(
  onFormSuccessSubmit,
  onFormErrorSubmit,
  'POST',
  new FormData(imageUploadFormElement)
);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  postUploadForm();
};

imageUploadFormElement.addEventListener('submit', onUploadFormSubmit);

export {onImageUploadChange};
