const pictureImgElement = document.querySelector('.big-picture__img img');
const pictureCaptionElement = document.querySelector('.social__caption');
const pictureLikesCountElement = document.querySelector('.likes-count');
const commentCountElement = document.querySelector('.social__comment-total-count');

const commentTemplate = document.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

const renderImagePreview = ({id, url, description, likes, comments}) => {
  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureImgElement.dataset.pictureId = id;
  pictureCaptionElement.textContent = description;
  pictureLikesCountElement.textContent = likes;
  commentCountElement.textContent = comments.length;
};

const renderComments = (comments) => {
  document.querySelectorAll('.social__comment').forEach((element) => element.remove());

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const socialPicture = commentElement.querySelector('.social__picture');
    const socialCommentText = commentElement.querySelector('.social__text');

    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialCommentText.textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
};

function renderFullPicture (picture) {
  renderImagePreview(picture);
  renderComments(picture.comments);
}

export {renderFullPicture};
