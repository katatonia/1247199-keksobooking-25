const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');

const isEscEvent = (evt) => evt.key === 'Escape'|| evt.key === 'Esc';

const removePopapListener = (element, onDocumentKeydown) => {
  element.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSuccessPopup = () => {
  document.body.appendChild(successPopup);
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removePopapListener(successPopup);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);
  successPopup.addEventListener('click', () => {
    removePopapListener(successPopup);
  });
};

const showErrorPopup = () => {
  document.body.appendChild(errorPopup);
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removePopapListener(errorPopup);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);
  closeErrorButton.addEventListener('click', () => {
    removePopapListener(errorPopup);
  });
  errorPopup.addEventListener('click', () => {
    removePopapListener(errorPopup);
  });
};

export { showSuccessPopup, showErrorPopup };
