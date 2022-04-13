export default class Card {
  constructor(data, userId, cardSelector, handlePopupOpen, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handlePopupOpen = handlePopupOpen;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  //-------Методы лайканья)
  isLiked() {
    const userPutLike = this._likes.find(user => user._id === this._userId);

    return userPutLike;
  };
  
  likesCount(newLikes) {
    this._likes = newLikes;
    const likesCountEl = this._element.querySelector('.element__caption-count');
    likesCountEl.textContent = this._likes.length;
    const likeElement = this._element.querySelector('.element__caption-like');
    if(this.isLiked()) {
      likeElement.classList.add('element__caption-like_aktive');      
    } else {
      likeElement.classList.remove('element__caption-like_aktive');
    };
  };

  //-------Метод слушателей событий
  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => this._handleDeleteClick(this._id));
    this._element.querySelector('.element__caption-like').addEventListener('click', () => this._handleLikeClick(this._id));
    this._element.querySelector('.element__card').addEventListener('click', () => this._handlePopupOpen(this._name, this._link));
  };

  //-------Метод генерации карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();  
    this._element.querySelector('.element__card').src = this._link;
    this._element.querySelector('.element__caption-text').textContent = this._name;
    this.likesCount(this._likes);
    
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }

    return this._element;
  };
};