const content = document.querySelector('.content');
const page = document.querySelector('.page');
const formElement = page.querySelector('.popup__container');
const popupProfile = page.querySelector('.popup_type_profile');
const popupMesto = page.querySelector('.popup_type_mesto');
const popupImage = page.querySelector('.popup_type_image');
const closePopapImage = popupImage.querySelector('.popup__button-close');
const editProfileInfoButton = page.querySelector('.profile__edit-button');
const closeProfileInfoButton = popupProfile.querySelector('.popup__button-close');
const addMestoButton = page.querySelector('.profile__add-button');
const popupCloseMesto = popupMesto.querySelector('.popup__button-close');
const userName = popupProfile.querySelector('.popup__input_field_name');
const userJob = popupProfile.querySelector('.popup__input_field_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const mestoName = popupMesto.querySelector('.popup__input_field_mesto');
const mestoLink = popupMesto.querySelector('.popup__input_field_link');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = page.querySelector('.template').content; //Находим template
const listElement = page.querySelector('.elements__list'); //Находим место вставки

initialCards.forEach(function(card) {
  addCard(listElement, createCard(card.name, card.link));
});
//--------Функция создания карточки
function  createCard(name, link) {
  const element = cardTemplate.cloneNode(true);
  element.querySelector('.element__caption-text').textContent = name;
  const elementCard = element.querySelector('.element__card');
  elementCard.src = link;
  elementCard.alt = name;
  //------Открытие попапа просмотра изображения карточки
  elementCard.addEventListener('click', function() { 
    openPopup(popupImage);
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__image').alt = name;
    popupImage.querySelector('.popup__caption').textContent = name;
  });
  //------Ставим/убираем лайк
  const likeButtonCard = element.querySelector('.element__caption-like');
  likeButtonCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__caption-like_aktive');
  });
  //------Удаление карточки
  const deleteButtonCard = element.querySelector('.element__trash');
  deleteButtonCard.addEventListener('click', () => {
    deleteButtonCard.closest('.elements__item').remove();
  });
  return element;
}
//--------Функция добавления карточки в контейнер
function addCard(listElement, element) {
  listElement.prepend(element);
}
//--------Форма отправки данных пользователя
function formSubmitHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;
    closePopup(popupProfile);
}
//--------Форма отправки данных места
function formSubmitHandlerMesto (evt) {
    evt.preventDefault();
    addCard(listElement, createCard(mestoName.value, mestoLink.value));
    popupMesto.querySelector('.popup__form').reset();
    closePopup(popupMesto);
}
//--------Функция открытия попапа профиля
function openPopupProfile() {
    openPopup(popupProfile);
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;
}
//--------Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pressEscape);
    document.addEventListener('click', clickOverlay);
}
//--------Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressEscape);
    document.removeEventListener('click', clickOverlay);
}
//--------Функция закрытия попапа клавишей "Escape"
function pressEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
//--------Функция закрытия попапа кликом на "overlay"
function clickOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  };
};
//--------Слушатели
editProfileInfoButton.addEventListener('click', openPopupProfile); //Слушатель открытия попапа профиль
closeProfileInfoButton.addEventListener('click', () => closePopup(popupProfile)); //Слушатель закрытия попапа профиль
addMestoButton.addEventListener('click', () => openPopup(popupMesto)); //Слушатель открытия попапа место
popupCloseMesto.addEventListener('click', () => closePopup(popupMesto)); //Слушатель закрытия попапа место
closePopapImage.addEventListener('click', () => closePopup(popupImage)); //Слушатель закрытия попапа просмотра изображения карточки
popupProfile.addEventListener('submit', formSubmitHandlerProfile); //Слушатель отправки формы профиль
popupMesto.addEventListener('submit', formSubmitHandlerMesto); //Слушатель отправки формы место