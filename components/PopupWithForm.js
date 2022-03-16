import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputs = this._popupSelector.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {}
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value
    });

    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}