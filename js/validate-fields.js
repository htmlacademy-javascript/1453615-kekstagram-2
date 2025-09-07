import {TextField} from './config.js';
import {stopEscapeOnFocus, isStringLengthValid} from './util.js';

const formUpload = document.querySelector('.img-upload__form');
const formUploadSubmit = document.querySelector('.img-upload__submit');
const hashtagsInputField = document.querySelector('.text__hashtags');
const descriptionInputField = document.querySelector('.text__description');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isFormSubmitDisabled = () => {
  formUploadSubmit.disabled = !pristine.validate();
};

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const validateHashtagsInput = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  if (inputHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: inputHashtags.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: inputHashtags.some((item) => item[0] === '#' && item.length === 1),
      error: 'Хэш-тег не может состоять только из одной решетки'
    },
    {
      check: inputHashtags.some((item) => isStringLengthValid(item, TextField.MAX_HASHTAG_SYMBOLS)),
      error: `Максимальная длина одного хэш-тега ${TextField.MAX_HASHTAG_SYMBOLS} символов, включая решетку`
    },
    {
      check: inputHashtags.length > TextField.MAX_HASHTAGS_COUNT,
      error: `Нельзя указать больше ${TextField.MAX_HASHTAGS_COUNT} хэш-тегов`
    },
    {
      check: inputHashtags.some((item, num, items) => items.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputHashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtagsInputField, validateHashtagsInput, getErrorMessage, 2, false);

const onHashtagFieldInput = () => {
  isFormSubmitDisabled();
};

const onHashtagsFieldKeydown = (evt) => {
  stopEscapeOnFocus(evt);
};

hashtagsInputField.addEventListener('input', onHashtagFieldInput);
hashtagsInputField.addEventListener('keydown', onHashtagsFieldKeydown);

const validateDescriptionInput = (value) => {
  errorMessage = '';
  const inputText = value.trim();
  const isInvalid = isStringLengthValid(inputText, TextField.MAX_DESCRIPTION_SYMBOLS);

  if (isInvalid) {
    errorMessage = `Максимальная длина комментария ${TextField.MAX_DESCRIPTION_SYMBOLS} символов`;
  }

  return !isInvalid;
};

pristine.addValidator(descriptionInputField, validateDescriptionInput, getErrorMessage, 2, false);

const onDescriptionInput = () => {
  formUploadSubmit.disabled = !pristine.validate();
};

const onDescriptionKeydown = (evt) => {
  stopEscapeOnFocus(evt);
};

descriptionInputField.addEventListener('input', onDescriptionInput);
descriptionInputField.addEventListener('keydown', onDescriptionKeydown);

export {hashtagsInputField, descriptionInputField};
