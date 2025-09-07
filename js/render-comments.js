import {Comments} from './config.js';

const commentsCounterElement = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.social__comments-loader');

const renderComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.height = Comments.AVATAR_SIZE;
  commentAvatar.width = Comments.AVATAR_SIZE;
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  commentElement.appendChild(commentText);

  return commentElement;
};

const renderComments = (comments, count) => {
  const commentListElement = document.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();

  commentListElement.querySelectorAll('.social__comment').forEach((element) => element.remove());

  for (let i = 0; i < count; i++) {
    commentsListFragment.appendChild(renderComment(comments[i]));
  }

  commentListElement.appendChild(commentsListFragment);
};

const renderCommentsCounter = (currentCount, totalCount) => {
  commentsLoaderButton.classList.toggle('hidden', currentCount >= totalCount);

  if (totalCount === 0) {
    commentsCounterElement.textContent = 'Нет комментариев';
    return;
  }

  commentsCounterElement.textContent = `${currentCount} из ${totalCount} комментариев`;
};

const createCommentsRenderer = (comments) => {
  const totalCount = comments.length;
  let currentCount = Math.min(Comments.INITIAL_COUNT, totalCount);

  return {
    init: () => {
      renderComments(comments, currentCount);
      renderCommentsCounter(currentCount, totalCount);
    },
    createCommentLoaderButtonHandler: function() {
      return () => {
        currentCount = Math.min(currentCount + Comments.LOAD_STEP, totalCount);
        renderComments(comments, currentCount);
        renderCommentsCounter(currentCount, totalCount);
      };
    }
  };
};

export {createCommentsRenderer};
