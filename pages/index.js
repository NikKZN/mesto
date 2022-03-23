import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/initial-cards.js";
import {
  popupProfile,
  popupMesto,
  popupImage,
  formPopupMesto,
  formPopupProfile,
  editProfileInfoButton,
  addMestoButton,
  userName,
  userJob,
  profileInfo,
  listElement,
  cardSelector,
  config
} from "../utils/constants.js";

const profileFormValidation = new FormValidator(config, formPopupProfile);
const mestoFormValidation = new FormValidator(config, formPopupMesto);

//--------Валидация формы профиля
profileFormValidation.enableValidation();

//--------Валидация формы место
mestoFormValidation.enableValidation();

//--------Создание класса попапа с картинкой
const popupCardImage = new PopupWithImage(popupImage);

//--------Создание класса секции карточек
const section = new Section({
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item.name, item.link));
    }
  },
  listElement
);

section.renderItems();

//--------Функция создания карточки
function createCard(name, link) {

  return new Card(name, link, cardSelector,
    (name, link) => {
      popupCardImage.open(name, link);
    }
  ).generateCard();
};

//--------Создание класса попапа Место
const popupMestoWithForm = new PopupWithForm(
  popupMesto,
  (data) => {
    section.addItem(createCard(data.mesto, data.link));
  }
);

//--------Создание класса информации о пользователе
const userInfo = new UserInfo(profileInfo);

//--------Создание класса попапа Профиль
const popupProfileWithForm = new PopupWithForm(
  popupProfile,
  (data) => {
    userInfo.setUserInfo(data)
  }
);

//--------Слушатель открытия попапа Профиль
editProfileInfoButton.addEventListener('click', () => { 
  popupProfileWithForm.open();
  const userData = userInfo.getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.job;
  profileFormValidation.resetValidation();
});

//--------Слушатель открытия попапа Место
addMestoButton.addEventListener('click', () => {
  popupMestoWithForm.open();
  mestoFormValidation.toggleButtonState();
});