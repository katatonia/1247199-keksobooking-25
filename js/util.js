const DELAY_TIME = 5000;
const RERENDER_DELAY = 500;

const getRandomInt = (min, max) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '5';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '500px';
  alertContainer.style.right = '50%';
  alertContainer.style.transform = 'translateX(50%)';
  alertContainer.style.top = '55px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff0000';
  alertContainer.style.color = '#000000';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, DELAY_TIME);
};


const submitButton = document.querySelector('.ad-form__submit');
const blockSubmitBtn = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitBtn = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY ) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInt,
  getRandomArrayElement,
  showAlert,
  blockSubmitBtn,
  unblockSubmitBtn,
  debounce,
  RERENDER_DELAY
};
