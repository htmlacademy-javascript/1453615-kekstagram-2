import {openFullPicture} from './open-full-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

const renderPictures = (images) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  images.forEach((image) => {
    const {id, url, description, likes, comments} = image;

    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);

  picturesList.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');

    if (!targetPicture) {
      return;
    }

    evt.preventDefault();
    images.filter((image) => {
      if (image.id === +targetPicture.dataset.pictureId) {
        openFullPicture(image);
      }
    });
  });
};

export {renderPictures};
