const getRandomInt = (min, max) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomFloat = (min, max, fraction = 1) => {
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

export { getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray };
