export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _clickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    };
  };

  _pressEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    };
  };

  _handleEscClose() {
    this._popupSelector.addEventListener('keydown', this._clickOverlay);
  }

  setEventListeners() {
    const buttonClose = this._popupSelector.querySelector('.popup__button-close');
    buttonClose.addEventListener('click', () => close(this._popupSelector));
    this._popupSelector.addEventListener('click', this._pressEscape);
  }
}