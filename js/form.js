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

disabledPage();

// Активное состояние страницы
const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');

  setElementDisabled(fieldsets);

  const mapFiltersArray = Array.from(mapFiltersElements);
  setElementDisabled(mapFiltersArray);
};

activePage();

// Валидация заголовка
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

const validateTitle = function (value) {
  return value.length >= 30 && value.length <= 100;
};

pristine.addValidator(adForm.querySelector('#title'), validateTitle);

// Синхронизация времени заезда и выезда
const adFormTime = document.querySelector('.ad-form__element--time');
adFormTime.onchange = function (evt) {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

// Синхронизация типа жилья и его минимальной стоимости
const type = document.querySelector('#type');
const price = document.querySelector('#price');

const setTypeChange = () => {
  type.addEventListener('change', () => {
    if (type.value === 'bungalow') {
      price.placeholder = '0';
      price.min = 0;
    } if (type.value === 'flat') {
      price.placeholder = '1000';
      price.min = 1000;
    } if (type.value === 'hotel') {
      price.placeholder = '3000';
      price.min = 3000;
    } if (type.value === 'house') {
      price.placeholder = '5000';
      price.min = 5000;
    } if (type.value === 'palace') {
      price.placeholder = '10000';
      price.min = 10000;
    }
  });
};

// Валидация соответствия типа жилья и его стоимости
pristine.addValidator(price, (value) => {
  const valueNumber = Number(value);
  return valueNumber >= price.min;
}, () => `Минимальное значение ${price.min}`);

type.addEventListener ('change', () =>{
  setTypeChange();
  pristine.validate(price);
});

// // Валидация полей с выбором количества комнат и мест
const roomNumber = document.getElementById('room_number');
const capacity = document.getElementById('capacity');

const validateRooms = () => {
  const roomNumberOptions = parseInt(roomNumber.options[roomNumber.selectedIndex].value, 10);
  const capacityOptions = parseInt(capacity.options[capacity.selectedIndex].value, 10);
  if (
    (roomNumberOptions !== 100 && capacityOptions === 0) ||
    (roomNumberOptions === 100 && capacityOptions !== 0) ||
    (roomNumberOptions < capacityOptions)
  ) {
    roomNumber.setCustomValidity('1 комната — «для 1 гостя»; 2 комнаты — «для 2 гостей» или «для 1 гостя»; 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»; 100 комнат — «не для гостей».');
  } else {
    roomNumber.setCustomValidity('');
  }
  adForm.reportValidity();
};

const roomNumberValidator = () => {
  roomNumber.addEventListener('change', () => {
    validateRooms();
    pristine.validate(capacity);
  });
};
const capacityValidator = () => {
  capacity.addEventListener('change', () => {
    validateRooms();
    pristine.validate(roomNumber);
  });
};

pristine.addValidator(
  roomNumber,
  roomNumberValidator,
  'Количество комнат должно соответствовать количеству гостей'
);

pristine.addValidator(
  capacity,
  capacityValidator,
  'Количество гостей должно соответствовать количеству комнат'
);

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { disabledPage, activePage };
