import { activePage } from './form.js';
import { objList } from './data.js';
import { createCard } from './card.js';

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
);

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

// Возвращает метку на изначальную точку
const resetButton = adForm.querySelector('button[type="reset"]');

// Возвращение метки на исходные координаты
const resetMainPin = (marker) => {
  marker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, zoomMap);
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

//Добавляет новые метки
objList.forEach(({location: {lat, lng}}) => {
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
    .bindPopup();
});
