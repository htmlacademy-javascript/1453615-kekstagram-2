const pictureImgElement = document.querySelector('.big-picture__img img');
const pictureCaptionElement = document.querySelector('.social__caption');
const pictureLikesCountElement = document.querySelector('.likes-count');
const commentCountElement = document.querySelector('.social__comment-total-count');

const renderImagePreview = ({id, url, description, likes, comments}) => {
  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureImgElement.dataset.pictureId = id;
  pictureCaptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
  commentCountElement.textContent = comments.length;
};

export {renderImagePreview};
