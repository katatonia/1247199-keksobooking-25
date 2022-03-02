const getRandomInt = (min, max) => {
  if (max <= min) {
    return ('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.')
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomInt(0, 10);

const getRandomDecimal = (min, max, fraction = 1) => {
  if (max <= min) {
    return ('Неверный диапазон. Максимальное число не может быть меньше или равно минимальному.');
  }

  const exponentiating = 10 ** fraction;
  return Math.floor((Math.random() * (max - min) + min) * exponentiating) / exponentiating;
}

getRandomDecimal(0, 10);
