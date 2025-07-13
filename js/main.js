const getRandomInt = (min, max) => {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ID = {
  'start': 1,
  'end': 25
};

const PHOTO_ID = {
  'start': 1,
  'end': 25
};

const LIKE_COUNT = {
  'start': 15,
  'end': 200
};

const AVATAR_ID = {
  'start': 1,
  'end': 6
};

const COMMENTS_COUNT = {
  'start': 0,
  'end': 30
};

const COMMENT_PHRASES_COUNT = {
  'start': 1,
  'end': 2
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
  const commentPhrasesCount = getRandomInt(COMMENT_PHRASES_COUNT.start, COMMENT_PHRASES_COUNT.end);
  const commentPhrases = [];
  const clonedCommentPhrases = [...COMMENT_PHRASES];

  for (let i = 0; i < commentPhrasesCount; i++) {
    commentPhrases.push(clonedCommentPhrases.splice(getRandomInt(0, clonedCommentPhrases.length - 1), 1)[0]);
  }

  return commentPhrases.join(' ');
};

const generateComments = (startId) => {
  const commentsCount = getRandomInt(COMMENTS_COUNT.start, COMMENTS_COUNT.end);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      'id': startId + i,
      'avatar': `img/avatar-${getRandomInt(AVATAR_ID.start, AVATAR_ID.end)}.svg`,
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

  for (let i = ID.start; i <= ID.end; i++) {
    postIds.push(i);
  }

  for (let i = PHOTO_ID.start; i <= PHOTO_ID.end; i++) {
    photoIds.push(i);
  }

  for (let i = 0; i < ID.end; i++) {
    const post = {
      'id': postIds.splice(getRandomInt(0, postIds.length - 1), 1)[0],
      'url': `photos/${photoIds.splice(getRandomInt(0, photoIds.length - 1), 1)[0]}.jpg`,
      'description': PHOTO_DESCRIPTIONS[getRandomInt(0, PHOTO_DESCRIPTIONS.length - 1)],
      'likes': getRandomInt(LIKE_COUNT.start, LIKE_COUNT.end),
      'comments': generateComments(commentId)
    };

    commentId += post.comments.length;
    posts.push(post);
  }

  return posts;
};

generatePosts();
