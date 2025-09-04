const INITIAL_COMMENTS_COUNT = 5;
const COMMENTS_LOAD_STEP = 5;

const commentsCounterElement = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.social__comments-loader');

const renderComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.height = '35';
  commentAvatar.width = '35';
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
  if (currentCount >= totalCount) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  if (totalCount === 0) {
    commentsCounterElement.textContent = 'Нет комментариев';
    return;
  }

  commentsCounterElement.textContent = `${currentCount} из ${totalCount} комментариев`;
};

const createCommentsRenderer = (comments) => {
  const totalCount = comments.length;
  let currentCount = Math.min(INITIAL_COMMENTS_COUNT, totalCount);

  return {
    init: () => {
      renderComments(comments, currentCount);
      renderCommentsCounter(currentCount, totalCount);
    },
    createCommentLoaderButtonHandler: function() {
      return () => {
        currentCount = Math.min(currentCount + COMMENTS_LOAD_STEP, totalCount);
        renderComments(comments, currentCount);
        renderCommentsCounter(currentCount, totalCount);
      };
    }
  };
};

export {createCommentsRenderer};
