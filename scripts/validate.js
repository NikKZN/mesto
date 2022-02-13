//--------Функция показа сообщения об ошибке
const showInputError = (configValidation, errorMessage) => {
  const {formSelector, inputSelector, inputErrorClass, errorClass} = configValidation;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//--------Функция скрытия сообщения об ошибке
const hideInputError = (configValidation) => {
  const {formSelector, inputSelector, inputErrorClass, errorClass} = configValidation;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//--------Функция проверки валидности поля
const checkInputValidity = ({formSelector, inputSelector, ...rest}) => {
  if (!inputSelector.validity.valid) {
    showInputError({formSelector, inputSelector, ...rest}, inputSelector.validationMessage);
  } else {
    hideInputError({formSelector, inputSelector, ...rest});
  };
};
//--------Функция переключения состояния кнопки
const toggleButtonState = ({formSelector, submitButtonSelector, inactiveButtonClass,}) => {
  const formValid = formSelector.checkValidity();
  const buttonElement = formSelector.querySelector(submitButtonSelector);//--Находим кнопку сабмита
  buttonElement.disabled = !formValid;
  buttonElement.classList.toggle(inactiveButtonClass, !formValid);
};
//--------Функция отслеживания ввода
const setEventListeners = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));//--Находим инпуты
  //const buttonElement = formSelector.querySelector(submitButtonSelector);//--Находим кнопку сабмита
  toggleButtonState({formSelector, submitButtonSelector, ...rest});//--Деактивация кнопки при открытии попапа
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => { //--Отслеживаем ввод символов в поле
      checkInputValidity({formSelector, inputSelector, ...rest});//--Проверяем ввод на валидность
      toggleButtonState({formSelector, submitButtonSelector, ...rest});//--Деактивируем кнопку при невалидном вводе
    });
  });
};
//--------Функция валидации
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));//--Находим все формы и создаём массив
  formList.forEach((formSelector) => {
    setEventListeners({formSelector, ...rest});
  });
};
//--------Вызов функции валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});