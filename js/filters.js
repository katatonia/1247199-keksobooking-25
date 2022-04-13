import { getData } from './server.js';
import { showAlert } from './util.js';
import { debounce } from './util.js';
import { cleanMapMarkers, addMarkerToMap } from './map.js';
import { resetPictures } from './upload.js';

const MAX_POINTS = 10;

// Функции фильтрации
const housingTypeFilter = (item) => {
  const filter = document.getElementById('housing-type');
  return filter.value === 'any' || item.offer.type === filter.value;
};

const housingPriceFilter = (item) => {
  const filter = document.getElementById('housing-price');
  const prices = {
    'high': (p) => p >= 50000,
    'middle': (p) => p >= 10000 && p <= 50000,
    'low': (p) => p <= 10000,
  };
  return filter.value === 'any' || prices[filter.value](item.offer.price);
};

const housingRoomsFilter = (item) => {
  const filter = document.getElementById('housing-rooms');
  return filter.value === 'any' || item.offer.rooms === +filter.value;
};

const housingGuestsFilter = (item) => {
  const filter = document.getElementById('housing-guests');
  return filter.value === 'any' || item.offer.guests === +filter.value;
};

const housingFeaturesFilter = (item) => {
  const filters = Array.from(document.querySelectorAll('#housing-features input'));
  let result = true;
  filters.filter(({checked}) => checked)
    .forEach(({value}) => {
      if (!item.offer.features || !item.offer.features.includes(value)) {
        result = false;
      }
    });
  return result;
};

// Данные
const allMapData = [];

const submitFilters = () => {
  cleanMapMarkers();
  allMapData
    .filter(housingTypeFilter)
    .filter(housingPriceFilter)
    .filter(housingRoomsFilter)
    .filter(housingGuestsFilter)
    .filter(housingFeaturesFilter)
    .slice(0, MAX_POINTS)
    .forEach((item) => addMarkerToMap(item));
};

getData((data) => {
  data.forEach((item) => allMapData.push(item));
  submitFilters();
}, showAlert);

const debouncedSubmitFilters = debounce(submitFilters, 500);

// Фильтры
const housingTypeFilterElement = document.getElementById('housing-type');
housingTypeFilterElement.addEventListener('change', () => {
  debouncedSubmitFilters();
});

const housingPriceFilterElement = document.getElementById('housing-price');
housingPriceFilterElement.addEventListener('change', () => {
  debouncedSubmitFilters();
});

const housingRoomsFilterElement = document.getElementById('housing-rooms');
housingRoomsFilterElement.addEventListener('change', () => {
  debouncedSubmitFilters();
});

const housingGuestsFilterElement = document.getElementById('housing-guests');
housingGuestsFilterElement.addEventListener('change', () => {
  debouncedSubmitFilters();
});

const housingFeaturesFiltersElements = document.querySelectorAll('#housing-features input');
housingFeaturesFiltersElements.forEach((filter) => {
  filter.addEventListener('click', () => {
    debouncedSubmitFilters();
  });
});

// Сброс фильтров
const resetFilters = () => {
  const form = document.querySelector('.map__filters');
  form.reset();
  debouncedSubmitFilters();
  resetPictures();
};

export { housingTypeFilter, housingPriceFilter, housingRoomsFilter, housingGuestsFilter, housingFeaturesFilter, submitFilters, debouncedSubmitFilters, resetFilters };
