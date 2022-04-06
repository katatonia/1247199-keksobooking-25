const adForm = document.querySelector('.ad-form');

// Валидация заголовка
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

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
type.addEventListener ('change', () =>{
  setTypeChange();
  pristine.validate(price);
});

// // Валидация полей с выбором количества комнат и мест
const roomNumber = document.getElementById('room_number');
const capacity = document.getElementById('capacity');

pristine.addValidator(capacity, (value) => {
  const roomNumberValue = roomNumber.value;
  switch (roomNumberValue){
    case '1':
      return (value === '1');
    case '2':
      return (value === '1' || value === '2');
    case '3':
      return (value === '1' || value === '2' || value === '3');
    case '100':
      return (value === '0');
  }
  return false;
}, 'Количество комнат должно соответствовать количеству гостей');
roomNumber.addEventListener ('change', () =>{
  pristine.validate(capacity);
});

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
