export default class Card {
  constructor(name, link, data) {
    this._name = name;
    this._link = link;
    this._data = data;
  };
  //--------Метод клонирования 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._data.cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };  
  //--------Метод удаления карточки
  _deleteCard() {
    this._element.remove();
  };
  //-------Метод постановки/снятия лайка
  _like() {
    this._element.querySelector('.element__caption-like')
    .classList.toggle('element__caption-like_aktive');
  };
  //-------Общий слушатель событий
  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__caption-like').addEventListener('click', () => {
      this._like();
    });

    this._element.querySelector('.element__card').addEventListener('click', () => {
      this._data.popupImageOpen(this._name, this._link);
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