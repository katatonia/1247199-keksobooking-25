const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const setElementDisabled = (array) => {
  array.forEach((element) => {
    if (element.disabled === false) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
  return array;
};

// Заблокированное состояние страницы
const disabledPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-filters--disabled');

  setElementDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setElementDisabled(mapFiltersArray);
};

// Активное состояние страницы
const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');
};

export { disabledPage, activePage };
