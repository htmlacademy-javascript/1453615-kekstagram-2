import {generatePosts} from './data.js';
import {renderPictures} from './render-pictures.js';
import {onImageUploadChange} from './upload-form.js';

const postsData = generatePosts();
renderPictures(postsData);
const imageUploadInputElement = document.querySelector('.img-upload__input');
imageUploadInputElement.addEventListener('change', onImageUploadChange);

