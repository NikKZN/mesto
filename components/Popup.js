export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonClose = this._popupSelector.querySelector('.popup__button-close');
  };
  //--------Метод открытия попапа
  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');       
  };
  //--------Метод закрытия попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._clickOverlay);
    this._buttonClose.removeEventListener('click', () => this.close());
    this._popupSelector.classList.remove('popup_opened');
  };
  //--------Метод закрытия попапа кликом на оверлэй
  _clickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  };
  //--------Метод закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };
  //--------Метод слушателей закрытия попапа
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('click', this._clickOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  };
};