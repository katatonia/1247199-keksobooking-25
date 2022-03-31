// const adForm = document.querySelector('.ad-form');
// const fieldsets = adForm.querySelectorAll('fieldset');
// const mapFilters = document.querySelector('.map__filters');
// const mapFiltersElements = mapFilters.children;

// const fn = (arr) => {
//   arr.forEach((elem) => {
//     if (elem.disabled === false) {
//       elem.disabled = true;
//     } else {
//       elem.disabled = false;
//     }
//   });
//   return arr;
// };

// console.log(fn(mapFiltersElements));

// const disabledPage = () => {
//   adForm.classList.add('ad-form--disabled');
//   mapFilters.classList.add('map-filters--disabled');

//   fieldsets.forEach((fieldset) => {
//     fieldset.disabled = true;
//   });

//   const mapFiltersArray = Array.from(mapFiltersElements);
//   mapFiltersArray.forEach((child) => {
//     child.disabled = true;
//   });
// };

// // disabledPage();

// const activePage = () => {
//   adForm.classList.remove('ad-form--disabled');
//   mapFilters.classList.remove('map-filters--disabled');

//   fieldsets.forEach((fieldset) => {
//     fieldset.disabled = false;
//   });

//   const mapFiltersArray = Array.from(mapFiltersElements);
//   mapFiltersArray.forEach((child) => {
//     child.disabled = false;
//   });
// };

// // activePage();

// export { disabledPage, activePage };
