const ALERT_TIMEOUT = 3000;

// const showErrorAlert = (message) => {
//   const alertElement = document.createElement('div');
//   alertElement.classList.add('error-message');
//   alertElement.textContent = message;
//   document.body.append(alertElement);

//   setTimeout(() => {
//     alertElement.remove();
//   }, ALERT_TIMEOUT);
// };

const showAlert = (selector) => {
  const alertTemplate = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const alertElement = alertTemplate.cloneNode(true);
  const alertSubmitButtonElement = alertElement.querySelector(`.${selector}__button`);
  document.body.appendChild(alertElement);

  const closeAlert = () => {
    alertSubmitButtonElement.removeEventListener('click', onAlertSubmitButtonClick);
    alertElement.removeEventListener('click', onAlertOverlayClick);
    alertElement.remove();
    document.removeEventListener('keydown', onAlertEscapeKeydown);
    imageUploadOverlayElement.classList.toggle('hidden', selector === ERROR_CLASS);
  };

  function onAlertEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeAlert();
    }
  }

  function onAlertSubmitButtonClick () {
    closeAlert();
  }

  function onAlertOverlayClick (evt) {
    if (evt.target.closest(`#${selector}`) || !evt.target.closest(`.${selector}__inner`)) {
      closeAlert();
    }
  }

  alertSubmitButtonElement.addEventListener('click', onAlertSubmitButtonClick);
  alertElement.addEventListener('click', onAlertOverlayClick);
  document.addEventListener('keydown', onAlertEscapeKeydown);
};

export {showAlert};
