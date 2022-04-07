import { popupConfirmDelete } from "../pages/index.js";

export default class Card {
  constructor(name, link, cardSelector, handlePopupOpen) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePopupOpen = handlePopupOpen;
  };
  //--------Метод клонирования
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };  
  //--------Метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  };
  //-------Метод постановки/снятия лайка
  _like() {
    this._element.querySelector('.element__caption-like')
    .classList.toggle('element__caption-like_aktive');
  };
  //-------Метод слушателей событий
  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      popupConfirmDelete.open();
      this._deleteCard();
    });

    this._element.querySelector('.element__caption-like').addEventListener('click', () => {
      this._like();
    });

    this._element.querySelector('.element__card').addEventListener('click', () => {
      this._handlePopupOpen(this._name, this._link);
    });
  };
  //-------Метод генерации карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();  
    this._element.querySelector('.element__card').src = this._link;
    this._element.querySelector('.element__caption-text').textContent = this._name;
    
    return this._element;
  };
};