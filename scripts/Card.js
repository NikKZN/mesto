export default class Card {
  constructor(name, link, data) {
    this._name = name;
    this._link = link;
    this._cardSelector = data.cardSelector;
    this._openPopup = data.openPopup;
    this._popupImageOpen = data.popupImageOpen;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }  

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();  
    this._element.querySelector('.element__card').src = this._link;
    this._element.querySelector('.element__caption-text').textContent = this._name;
    
    return this._element;
  }
  
  _deleteCard() {
    this._element.remove();
  }

  _like() {
    this._element.querySelector('.element__caption-like').classList.toggle('element__caption-like_aktive');
  }

  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__caption-like').addEventListener('click', () => {
      this._like();
    });

    this._element.querySelector('.element__card').addEventListener('click', () => {
      this._popupImageOpen(this._name, this._link);
    });
  }
   
};

