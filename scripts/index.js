import Card from "./Card.js";

const content = document.querySelector('.content');
const page = document.querySelector('.page');
const popupProfile = page.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupMesto = page.querySelector('.popup_type_mesto');
const popupMestoForm = popupMesto.querySelector('.popup__form');
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
//const cardTemplate = page.querySelector('.template'); //Находим template
const listElement = page.querySelector('.elements__list'); //Находим место вставки
const popupMestoButton = popupMesto.querySelector('.popup__button-save');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
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
//--------Функция открытия попапа профиля
function openPopupProfile() {
    openPopup(popupProfile);
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;
};
//--------Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pressEscape);
    popup.addEventListener('click', clickOverlay);
};
//------Функция открытия попапа просмотра изображения карточки
const openPopupImage = (name, link) => { 
  openPopup(popupImage);
  const imageCard = popupImage.querySelector('.popup__image');
  imageCard.src = link;
  imageCard.alt = name;
  popupImage.querySelector('.popup__caption').textContent = name;
};
//--------Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressEscape);
    popup.removeEventListener('click', clickOverlay);
};
//--------Функция закрытия попапа клавишей "Escape"
function pressEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
//--------Функция закрытия попапа кликом на "overlay"
function clickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};
//--------Объект настроек карточки
const data = {
  cardSelector: '.template',
  popupImageOpen: openPopupImage
};
//--------Функция создания карточки
function createCard(name, link, data) {
  const card = new Card(name, link, data);
  const cardElement = card.generateCard();
  return cardElement;
}
//--------Функция добавления карточки на страницу
function addCard(item) {
  listElement.prepend(item);
}
//--------Добавляем карточки из массива
initialCards.forEach((item) => {  
  addCard(createCard(item.name, item.link, data));
});
//--------Форма отправки данных пользователя
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileJob.textContent = userJob.value;
  closePopup(popupProfile);
};
//--------Форма отправки данных места
function formSubmitHandlerMesto (evt) {
  evt.preventDefault();
  addCard(createCard(mestoName.value, mestoLink.value, data));
  popupMesto.querySelector('.popup__form').reset();
  //toggleButtonState(popupMestoForm, config);
  closePopup(popupMesto);
}; 
//--------Слушатели
editProfileInfoButton.addEventListener('click', () => { //Слушатель открытия попапа профиль
  openPopupProfile();
  resetValidation(config, popupProfileForm);
});
addMestoButton.addEventListener('click', () => {openPopup(popupMesto)}); //Слушатель открытия попапа место
closeProfileInfoButton.addEventListener('click', () => closePopup(popupProfile)); //Слушатель закрытия попапа профиль
popupCloseMesto.addEventListener('click', () => closePopup(popupMesto)); //Слушатель закрытия попапа место
closePopapImage.addEventListener('click', () => closePopup(popupImage)); //Слушатель закрытия попапа просмотра изображения карточки
popupProfile.addEventListener('submit', formSubmitHandlerProfile); //Слушатель отправки формы профиль
popupMesto.addEventListener('submit', formSubmitHandlerMesto); //Слушатель отправки формы место