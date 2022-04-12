import { activePage } from './form.js';
import { objList } from './data.js';
import { housingTypes, renderPhotos} from './card.js';
import { getData } from './server.js';
import { showAlert } from './util.js';

const adForm = document.querySelector('.ad-form');
const CENTER_TOKYO = {
  lat: 35.69034,
  lng: 139.75175,
};
const zoomMap = 12;

// Передаёт координаты метки в поле адреса
const addressForm = adForm.querySelector('#address');
const updateAddress = (location) => {
  const lat = location.lat.toFixed(5);
  const lng = location.lng.toFixed(5);
  addressForm.value = `${lat} ${lng}`;
};

//Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    updateAddress(CENTER_TOKYO);
    activePage();
  })
  .setView(CENTER_TOKYO, zoomMap);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Меняет иконку главной метки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Главная метка
const mainPin = L.marker(
  CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPin.addTo(map);

// Передача координат метки в поле адреса
mainPin.on('move', (evt) => {
  updateAddress(evt.target.getLatLng());
});

// Возвращение метки на исходные координаты
const resetButton = document.querySelector('button[type="reset"]');
const resetMainPin = (marker) => {
  marker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, 12);
};

const getResetForm = () => {
  resetMainPin(mainPin);
};

resetButton.addEventListener('click', getResetForm);

// Меняет иконку меток
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createPopup = (point) => {
  const popup = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popup.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = housingTypes[point.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  popupElement.querySelector('.popup__features').textContent = point.offer.features.join(', ');

  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  if (point.offer.description.length === 0) {
    point.offer.description.classList.add('.visually-hidden');
  }

  const photoCard = popupElement.querySelector('.popup__photos');
  renderPhotos(point.offer.photos, photoCard);

  popupElement.querySelector('.popup__avatar').src = point.author.avatar;

  return popupElement;
};

//Добавляет новые метки
objList.forEach((item) => {
  const {lat, lng} = item.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPopup(item));
});

// Сбрасывает страницу
// const getResetPage = () => {
//   mainPin.setLatLng(CENTER_TOKYO);
//   map.setView(CENTER_TOKYO, 12);
//   adForm.reset();
//   const adFormInputs = adForm.querySelectorAll('input');
//   adFormInputs.forEach((input) => input.textContent = '');
//   const resetMainPinMarker = mainPin.getLatLng();
//   getAddressCoordinates(resetMainPinMarker);
//   onTypeChange();
//   mapFilters.reset();
//   clearMarker();
// };
