import {isEscapeKey} from './util.js';
import {renderFullPicture} from './render-full-picture.js';

const bigPictureElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = document.querySelector('#picture-cancel');

const closeModal = (modalElement) => {
  modalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
  pictureCloseButtonElement.removeEventListener('click', onPreviewCloseButtonClick);
};

const openModal = (modalElement) => {
  modalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscapeKeydown);
  pictureCloseButtonElement.addEventListener('click', onPreviewCloseButtonClick);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

function onPreviewEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal(bigPictureElement);
  }
}

function onPreviewCloseButtonClick() {
  closeModal(bigPictureElement);
}

const openFullPicture = (picture) => {
  openModal(bigPictureElement);
  renderFullPicture(picture);
};

export {openFullPicture};
