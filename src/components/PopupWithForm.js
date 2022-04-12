import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputs = this._popupSelector.querySelectorAll('.popup__input');
  };
  //--------Метод сбора данных полей формы
  _getInputValues() {
    this._formFields = {};    
    this._inputs.forEach(el => {
      this._formFields[el.name] = el.value;
    });
    return this._formFields;
  };
  //--------Метод закрытия попапа
  close() {
    this._form.removeEventListener('submit', this._formSubmit);
    super.close();
  };
  //--------Метод слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);    
  };
  //--------Метод сабмита формы
  _formSubmit = (evt) => {
    evt.preventDefault();
    this._formSubmitCallback(this._getInputValues());
    this._form.reset();
    this.close();
  };
  //--------Метод подмены сабмита для удаления карточки
  changeFormSubmit(newSubmitHandler) {
    this._formSubmitCallback = newSubmitHandler;
  }
};