import {Alert} from './config.js';
import {isEscapeKey} from './util.js';

const showErrorDataAlert = (alertTemplateName) => {
  const alertTemplate = document.querySelector(`#${alertTemplateName}`)
    .content.querySelector(`.${alertTemplateName}`);
  const alertElement = alertTemplate.cloneNode(true);
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, Alert.TIMEOUT);
};

const showAlert = (alertTemplateName) => {
  const alertTemplate = document.querySelector(`#${alertTemplateName}`)
    .content.querySelector(`.${alertTemplateName}`);
  const alertElement = alertTemplate.cloneNode(true);
  const alertSubmitButtonElement = alertElement.querySelector(`.${alertTemplateName}__button`);
  document.body.appendChild(alertElement);

  alertSubmitButtonElement.addEventListener('click', onAlertSubmitButtonClick);
  alertElement.addEventListener('click', onAlertOverlayClick);
  document.addEventListener('keydown', onAlertEscapeKeydown);

  function closeAlert() {
    alertSubmitButtonElement.removeEventListener('click', onAlertSubmitButtonClick);
    alertElement.removeEventListener('click', onAlertOverlayClick);
    alertElement.remove();
    document.removeEventListener('keydown', onAlertEscapeKeydown);
  }

  function onAlertEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  }

  function onAlertSubmitButtonClick () {
    closeAlert();
  }

  function onAlertOverlayClick (evt) {
    if (evt.target.closest(`#${alertTemplateName}`) || !evt.target.closest(`.${alertTemplateName}__inner`)) {
      closeAlert();
    }
  }
};

export {showAlert, showErrorDataAlert};
