import {Alert, Urls} from './config.js';

const getData = (onSuccess, onError) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      onError(Alert.DATA_ERROR);
    });
};

const createRequest = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export {createRequest, getData};
