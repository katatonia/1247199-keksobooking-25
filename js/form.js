const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const setElementDisabled = (array, value) => {
  array.forEach((element) => {
    element.disabled = value;
  });
  return array;
};

// Заблокированное состояние страницы
const disabledPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-filters--disabled');

  setElementDisabled(fieldsets, true);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setElementDisabled(mapFiltersArray, true);
};

disabledPage();

// Активное состояние страницы
const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');

  setElementDisabled(fieldsets, false);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setElementDisabled(mapFiltersArray, false);
};

export { disabledPage, activePage };
