export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  };
  //--------Метод показа сообщения об ошибке
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
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
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };  
  //--------Метод переключения состояния кнопки
  toggleButtonState() {
    const formValid = this._form.checkValidity();
    this._buttonElement.disabled = !formValid;
    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !formValid);
  };  
  //-------Метод слушателей событий
  _setEventListeners() {
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