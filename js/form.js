const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const isDisabled = (array) => {
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

  isDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  isDisabled(mapFiltersArray);
};

disabledPage();

const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');

  isDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  isDisabled(mapFiltersArray);
};

activePage();

const pristine = new Pristine(adForm, {
  classTo: '#title',
});

const validateTitle = function (value) {
  return value.length >= 30 && value.length <= 100;
};

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'Ошибка');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { disabledPage, activePage };
