//--------Функция показа сообщения об ошибке
const showInputError = (formElement, inputElement, config, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
//--------Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};
//--------Функция проверки валидности поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};
//--------Функция переключения состояния кнопки
const toggleButtonState = (formElement, config) => {
  const formValid = formElement.checkValidity();
  const buttonElement = formElement.querySelector(config.submitButtonSelector);//--Находим кнопку сабмита
  buttonElement.disabled = !formValid;
  buttonElement.classList.toggle(config.inactiveButtonClass, !formValid);
};
//--------Функция отслеживания ввода
const setEventListeners = (formElement, config) => {
  const inputElement = config.inputSelector;
  const inputList = Array.from(formElement.querySelectorAll(inputElement));//--Находим инпуты
  toggleButtonState(formElement, config);//--Деактивация кнопки при открытии попапа
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => { //--Отслеживаем ввод символов в поле
      checkInputValidity(formElement, inputElement, config);//--Проверяем ввод на валидность
      toggleButtonState(formElement, config);//--Деактивируем кнопку при невалидном вводе
    });
  });
};
//--------Функция сброса валидации
const resetValidation = (config, popupIsOpen) => {
  const inputElement = config.inputSelector;
  const inputList = Array.from(popupProfileForm.querySelectorAll(inputElement));
  inputList.forEach((inputElement) => { 
    hideInputError(popupIsOpen, inputElement, config); 
  });
};
//--------Функция валидации
const enableValidation = (config) => {
  const formElement = config.formSelector;
  const formList = Array.from(document.querySelectorAll(formElement));//--Находим все формы и создаём массив
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};