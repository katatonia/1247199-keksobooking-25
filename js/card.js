import { createObjList } from './data.js';

const objList = createObjList();

const housingTypes = {
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
};

const renderPhotos = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.map((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    });

    container.appendChild(fragment);

  } else {
    container.classList.add('.visually-hidden');
  }
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardFragment = document.createDocumentFragment();

objList.forEach(({offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = housingTypes[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__features').textContent = features.join(', ');

  cardElement.querySelector('.popup__description').textContent = description;
  if (description.length === 0) {
    description.classList.add('.visually-hidden');
  }

  const photoCard = cardElement.querySelector('.popup__photos');
  renderPhotos(photos, photoCard);

  cardElement.querySelector('.popup__avatar').src = avatar;

  cardFragment.appendChild(cardElement);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cardFragment);
