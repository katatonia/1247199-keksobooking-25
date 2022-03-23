const OBJ_COUNT = 10;

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

let number = 0;
const getAvatarNumber = () => {
  for (let i = 1; i <= OBJ_COUNT; i++) {
    number += 1;
    if (number < 10) {
      return `img/avatars/user0${number}.png`;
    } else {
      return `img/avatars/user${number}.png`;
    }
  }
};

const getRandomArray = (array) => {
  const copiedArray = array.slice();
  const randomArrayLength = getRandomInt(1, array.length);
  const randomArray = new Array (randomArrayLength);

  for (let i = 0; i < randomArrayLength; i++) {
    const randomArrayElement = getRandomArrayElement(copiedArray);
    randomArray.push(randomArrayElement);
  }

  return randomArray;
};

const titles = [
  'OldHouse Apartments',
  'Vergi Villa Guesthouse',
  'Reiu Holiday Centre',
  'Kuuli Puhkemajad',
];

const typeList = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const checkinList = [
  '12:00',
  '13:00',
  '14:00'
];

const checkoutList = [
  '12:00',
  '13:00',
  '14:00'
];

const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const descriptions = [
  'Апарт-комплекс OldHouse расположен в средневековом Старом городе Таллина',
  'Гостевой дом Vergi Villa расположен в городе Верги',
  'Комплекс для отдыха Reiu расположен в деревне Силла, прямо на берегу реки Рейу',
  'Комплекс Kuuli Puhkemajad расположен в сосновом лесу у моря. Он находится в Тагаранне на острове Сааремаа',
];

const photosList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createObj = () => {
  const lat = getRandomFloat(35.65000, 35.70000);
  const lng = getRandomFloat(139.7000, 139.80000);

  return {
    'author': {
      'avatar': getAvatarNumber(),
    },
    'offer': {
      'title': getRandomArrayElement(titles),
      'address': `${lat}, ${lng}`,
      'price': getRandomInt(3000, 50000),
      'type': getRandomArrayElement(typeList),
      'rooms': getRandomInt(1, 10),
      'guests': getRandomInt(1, 7),
      'checkin': getRandomArrayElement(checkinList),
      'checkout': getRandomArrayElement(checkoutList),
      'features': getRandomArray(featuresList),
      'description': getRandomArrayElement(descriptions),
      'photos': getRandomArray(photosList),
    },
    'location': {
      'lat': lat,
      'lng': lng,
    },
  };
};

const createObjList = Array.from({length: OBJ_COUNT}, createObj);

console.log(createObjList);
