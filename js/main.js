const getRandomInt = (min, max) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

getRandomInt(0, 10);

const getRandomFloat = (min, max, fraction = 1) => {
  if (max <= min) {
    throw new Error('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  }

  const exponentiating = 10 ** fraction;
  return Math.floor((Math.random() * (max - min) + min) * exponentiating) / exponentiating;
};

getRandomFloat(0, 10);
