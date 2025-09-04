import {closeModal, openModal, isEscapeKey} from './util.js';
import {hashtagsInputField, descriptionInputField} from './validate-fields.js';
import {imageUploadInputElement} from './upload-photo.js';

const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageUploadCloseButtonElement = document.querySelector('.img-upload__cancel');

const resetImageUploadForm = () => {
  imageUploadInputElement.value = '';
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
