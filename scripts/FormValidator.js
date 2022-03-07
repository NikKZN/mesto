export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  };
  //--------Метод показа сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  //--------Метод скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
  //--------Метод проверки валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };  
  //--------Метод переключения состояния кнопки
  toggleButtonState() {
    const formValid = this._form.checkValidity();
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    buttonElement.disabled = !formValid;
    buttonElement.classList.toggle(this._config.inactiveButtonClass, !formValid);
  };  
  //-------Метод слушателей событий
  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState();
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._inputList.forEach((inputElement) => {      
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };
  //--------Метод сброса валидации
  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => { 
      this._hideInputError(inputElement); 
    });
  };
  //--------Метод валидации
  enableValidation () {    
    this._setEventListeners();    
  };  
};