import Popup from "./Popup";
import Card from "./Card";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popupSelector.querySelector('.popup__button-confirm');
  }

  

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      console.log('111')
    });
  }


}