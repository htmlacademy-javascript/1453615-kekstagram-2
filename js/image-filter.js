import {PicturesFilter} from './config.js';
import {shuffleArray, debounce} from './util.js';
import {renderPictures} from './render-pictures.js';

const sortingFilter = document.querySelector('.img-filters');
const sortingFilterForm = sortingFilter.querySelector('.img-filters__form');
const sortingFilterButons = sortingFilter.querySelectorAll('.img-filters__button');

const filterRules = [
  {
    id: 'filter-default',
    action: (images) => renderPictures(images.slice())
  },
  {
    id: 'filter-random',
    action: (images) => {
      const randomImages = shuffleArray(images.slice());
      renderPictures(randomImages.slice(0, PicturesFilter.RANDOM_PHOTOS_COUNT));
    }
  },
  {
    id: 'filter-discussed',
    action: (images) => {
      const sortingHandler = (imageA, imageB) => imageB.comments.length - imageA.comments.length;
      renderPictures(images.slice().sort(sortingHandler));
    }
  }
];

const getFilteredImages = (images, filterId) => {
  filterRules.filter((rule) => {
    if (rule.id === filterId) {
      rule.action(images);
    }
  });
};

const debouncedGetFilteredImages = debounce(getFilteredImages, PicturesFilter.DEBOUNCE_DELAY);

const filterImages = (images) => {
  sortingFilter.classList.remove('img-filters--inactive');

  sortingFilterForm.addEventListener('click', (evt) => {
    debouncedGetFilteredImages(images, evt.target.id);
    Array.from(sortingFilterButons).forEach((button) => {
      button.classList.toggle('img-filters__button--active', button.id === evt.target.id);
    });
  });
};

export {filterImages};
