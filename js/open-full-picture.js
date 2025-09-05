import {isEscapeKey, openModal, closeModal} from './util.js';
import {renderImagePreview} from './render-full-picture.js';
import {createCommentsRenderer} from './render-comments.js';

const bigPictureModalElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = document.querySelector('#picture-cancel');
const commentsLoadButtonElement = document.querySelector('.social__comments-loader');

let commentsRenderer = null;
let onCommentsLoadButtonClick = null;

function closePictureModal() {
  closeModal(bigPictureModalElement);
  document.removeEventListener('keydown', onPreviewEscapeKeydown);
  pictureCloseButtonElement.removeEventListener('click', onPreviewCloseButtonClick);
  commentsLoadButtonElement.removeEventListener('click', onCommentsLoadButtonClick);

  commentsRenderer = null;
  onCommentsLoadButtonClick = null;
}

function openPictureModal() {
  openModal(bigPictureModalElement);
  document.addEventListener('keydown', onPreviewEscapeKeydown);
  pictureCloseButtonElement.addEventListener('click', onPreviewCloseButtonClick);
}

function onPreviewEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePictureModal();
  }
}

function onPreviewCloseButtonClick() {
  closePictureModal();
}

const openFullPicture = (picture) => {
  openPictureModal();

  renderImagePreview(picture);

  commentsRenderer = createCommentsRenderer(picture.comments);
  onCommentsLoadButtonClick = commentsRenderer.createCommentLoaderButtonHandler();
  commentsRenderer.init();
  commentsLoadButtonElement.addEventListener('click', onCommentsLoadButtonClick);
};

export {openFullPicture};
