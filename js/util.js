const getRandomInt = (min, max) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomFloat = (min, max, fraction = 5) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  }

  const exponentiating = 10 ** fraction;
  return Math.floor((Math.random() * (max - min) + min) * exponentiating) / exponentiating;
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArray = (array) => {
  const newArray = new Array (getRandomInt(1, array.length)).fill(' ').map(() => (getRandomArrayElement(array)));
  const randomArray = [...new Set (newArray)];
  return randomArray;
};

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
  }, 5000);
};


const submitButton = document.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export { getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray, showAlert, blockSubmitButton, unblockSubmitButton };
