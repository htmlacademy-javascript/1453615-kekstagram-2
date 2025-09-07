import {renderPictures} from './render-pictures.js';
import {onImageUploadChange} from './upload-form.js';
import {filterImages} from './image-filter.js';
import {getData} from './fetch.js';
import {showErrorDataAlert} from './alert.js';

getData((images) => {
  renderPictures(images);
  filterImages(images);
},
(params) => {
  showErrorDataAlert(params);
});

const imageUploadInputElement = document.querySelector('.img-upload__input');
imageUploadInputElement.addEventListener('change', onImageUploadChange);

