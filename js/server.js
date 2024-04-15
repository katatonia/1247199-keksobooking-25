const DATA = 'https://25.javascript.htmlacademy.pro/keksobooking/data';
const SERVER = 'https://25.javascript.htmlacademy.pro/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      if (onFail) {
        onFail(`Ошибка загрузки данных ${err}`);
      }
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER, {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess('Объявление успешно размещено!');
      } else if (response.status >= 500 && response.status <= 505) {
        onFail('Не удалось получить данные с сервера. Попробуйте ещё раз!');
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз!');
    });
};

export { getData, sendData };
