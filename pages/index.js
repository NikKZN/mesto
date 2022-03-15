import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../scripts/initial-cards.js";
import Section from "../components/Section.js";
import { popupProfile, popupMesto, popupImage } from "../utils/constants.js";
import { formPopupMesto, formPopupProfile } from "../utils/constants.js";
import { closePopapImage, editProfileInfoButton, closeProfileInfoButton, addMestoButton, popupCloseMesto } from "../utils/constants.js";
import { userName, userJob, profileName, profileJob, mestoName, mestoLink } from "../utils/constants.js";
import { listElement, imageCard, captionCard, cardSelector } from "../utils/constants.js";
import { config } from "../utils/constants.js";

const profileFormValidation = new FormValidator(config, formPopupProfile);
const mestoFormValidation = new FormValidator(config, formPopupMesto);
//console.log(cardSelector)

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
function openPopupImage(name, link) { 
  openPopup(popupImage);
  imageCard.src = link;
  imageCard.alt = name;
  captionCard.textContent = name;
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
//--------Добавляем массив карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, cardSelector, openPopupImage);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    }  
  },
  listElement
);

//--------Валидация формы профиля
profileFormValidation.enableValidation();
//--------Валидация формы место
mestoFormValidation.enableValidation();
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
  addCard(createCard(mestoName.value, mestoLink.value));
  formPopupMesto.reset();
  mestoFormValidation.toggleButtonState();
  closePopup(popupMesto);
};
//--------Слушатели
editProfileInfoButton.addEventListener('click', () => { //Слушатель открытия попапа профиль
  openPopupProfile();
  profileFormValidation.resetValidation();
});
addMestoButton.addEventListener('click', () => {openPopup(popupMesto)}); //Слушатель открытия попапа место
closeProfileInfoButton.addEventListener('click', () => closePopup(popupProfile)); //Слушатель закрытия попапа профиль
popupCloseMesto.addEventListener('click', () => closePopup(popupMesto)); //Слушатель закрытия попапа место
closePopapImage.addEventListener('click', () => closePopup(popupImage)); //Слушатель закрытия попапа просмотра изображения карточки
popupProfile.addEventListener('submit', formSubmitHandlerProfile); //Слушатель отправки формы профиль
popupMesto.addEventListener('submit', formSubmitHandlerMesto); //Слушатель отправки формы место

cardList.renderItems();