const housingTypes = {
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
};

const renderPhotos = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.map((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    });

    container.appendChild(fragment);

  } else {
    container.classList.add('.visually-hidden');
  }
};

export { housingTypes, renderPhotos };
