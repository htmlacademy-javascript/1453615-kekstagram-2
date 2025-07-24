import {getRandomInt} from './util.js';

const Id = {
  START: 1,
  END: 25
};

const PhotoId = {
  START: 1,
  END: 25
};

const LikeCount = {
  START: 15,
  END: 200
};

const AvatarId = {
  START: 1,
  END: 6
};

const CommentsCount = {
  START: 0,
  END: 30
};

const CommentPhrasesCount = {
  START: 1,
  END: 2
};

const PHOTO_DESCRIPTIONS = [
  'Туманное утро в горах',
  'Кофе на деревянном столе',
  'Ребёнок пускает мыльные пузыри',
  'Старый маяк на рассвете',
  'Уличный музыкант играет на скрипке',
  'Лавандовые поля под солнцем',
  'Книги на пыльной полке',
  'Дождевые капли на окне',
  'Собака в цветущих одуванчиках',
  'Заброшенная железная дорога',
  'Горячий чай с мёдом',
  'Снегопад в городском парке',
  'Парусник в открытом море',
  'Свечи на праздничном торте',
  'Фонари отражаются в лужах',
  'Бабушка вяжет у камина',
  'Велосипед прислонён к стене',
  'Первые цветы после зимы',
  'Дым от костра в лесу',
  'Девушка читает на скамейке'
];

const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Алексей Марков',
  'Екатерина Воронова',
  'Максим Белов',
  'Светлана Орлова',
  'Глеб Соколов',
  'Ольга Морозова',
  'Дмитрий Крылов',
  'Арина Жукова',
  'Тимофей Зорин',
  'Артём Громов',
  'Софья Лебедева',
  'Виктор Новиков',
  'Милана Ветрова',
  'Григорий Лукин',
  'Алиса Родионова',
  'Борис Щукин',
  'Кира Мельникова',
  'Роман Савельев',
  'Зоя Комарова',
  'Полина Ларина'
];

const generateCommentMessages = () => {
  const commentPhrasesCount = getRandomInt(CommentPhrasesCount.START, CommentPhrasesCount.END);
  const commentPhrases = [];
  const clonedCommentPhrases = [...COMMENT_PHRASES];

  for (let i = 0; i < commentPhrasesCount; i++) {
    commentPhrases.push(clonedCommentPhrases.splice(getRandomInt(0, clonedCommentPhrases.length - 1), 1)[0]);
  }

  return commentPhrases.join(' ');
};

const generateComments = (startId) => {
  const commentsCount = getRandomInt(CommentsCount.START, CommentsCount.END);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      'id': startId + i,
      'avatar': `img/avatar-${getRandomInt(AvatarId.START, AvatarId.END)}.svg`,
      'message': generateCommentMessages(),
      'name': USER_NAMES[getRandomInt(0, USER_NAMES.length - 1)]
    };

    comments.push(comment);
  }

  return comments;
};

const generatePosts = () => {
  const postIds = [];
  const photoIds = [];
  const posts = [];
  let commentId = 0;

  for (let i = Id.START; i <= Id.END; i++) {
    postIds.push(i);
  }

  for (let i = PhotoId.START; i <= PhotoId.END; i++) {
    photoIds.push(i);
  }

  for (let i = 0; i < Id.END; i++) {
    const post = {
      'id': postIds.splice(getRandomInt(0, postIds.length - 1), 1)[0],
      'url': `photos/${photoIds.splice(getRandomInt(0, photoIds.length - 1), 1)[0]}.jpg`,
      'description': PHOTO_DESCRIPTIONS[getRandomInt(0, PHOTO_DESCRIPTIONS.length - 1)],
      'likes': getRandomInt(LikeCount.START, LikeCount.END),
      'comments': generateComments(commentId)
    };

    commentId += post.comments.length;
    posts.push(post);
  }

  return posts;
};

export {generatePosts};
