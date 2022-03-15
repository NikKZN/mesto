import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCard = this._popupSelector.querySelector('.popup__image');
    this._captionCard = this._popupSelector.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open()
    this._imageCard.src = link;
    this._imageCard.alt = name;
    this._captionCard.textContent = name;
  }
}