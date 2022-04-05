const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const setDisabled = (array) => {
  array.forEach((element) => {
    if (element.disabled === false) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
  return array;
};

const disabledPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-filters--disabled');

  setDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setDisabled(mapFiltersArray);
};

disabledPage();

const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');

  setDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setDisabled(mapFiltersArray);
};

activePage();

export { disabledPage, activePage };
