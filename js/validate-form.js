//import { blockSubmitBtn, unblockSubmitBtn } from "./util";
import { sendData, getData } from "./server";

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

// Валидация соответствия типа жилья и его стоимости
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const validatePrice = function (value) {
  return MinPrices[type.value] <= (value.length && parseInt(value, 10)) && (value.length && parseInt(value, 10)) <= 100000;
};

const onChangeOfferType = function () {
  price.value = MinPrices[type.value];
  price.dispatchEvent(new Event('change'));
};

pristine.addValidator(price, validatePrice);
type.addEventListener('change', onChangeOfferType);

// Валидация полей с выбором количества комнат и мест
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
roomNumber.addEventListener ('change', () => {
  pristine.validate(capacity);
});

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //pristine.validate();
  getData((d) => console.log(d), (e) => console.log(e));
});

// const setUserFormSubmit = (onSuccess, onFail) => {
//   adForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if (isValid) {
//       blockSubmitBtn();
//       sendData(
//         () => {
//           onSuccess();
//           unblockSubmitBtn();
//           getResetPage();
//         },
//         () => {
//           onFail();
//           unblockSubmitBtn();
//         },
//         new FormData(evt.target)
//       );
//     }
//   });
// };
