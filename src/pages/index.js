import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import {
  popupProfile,
  popupMesto,
  popupImage,
  popupConfirm,
  formPopupMesto,
  formPopupProfile,
  editProfileInfoButton,
  addMestoButton,
  userName,
  userJob,
  profileInfo,
  listElement,
  cardSelector,
  config,
} from "../utils/constants.js";

//--------Константы валидации
const profileFormValidation = new FormValidator(config, formPopupProfile);
const mestoFormValidation = new FormValidator(config, formPopupMesto);

//--------Валидация формы профиля
profileFormValidation.enableValidation();

//--------Валидация формы место
mestoFormValidation.enableValidation();

//--------Создание класса попапа с картинкой
const popupCardImage = new PopupWithImage(popupImage);

//--------Создание класса попапа Confirm
export const popupConfirmDelete = new PopupConfirmDelete(popupConfirm);
popupConfirmDelete.setEventListeners();

//--------Функция создания карточки
function createCard(name, link, likes) {
  return new Card(name, link, likes, cardSelector,
    (name, link) => {
      popupCardImage.open(name, link);
    }
  ).generateCard();
};

//--------Создание класса секции карточек
const section = new Section({ items: [], renderer: createCard },
listElement
);

//--------Загрузка карточек с сервера
api.getInitialCards()
  .then(res => {
    res.reverse().forEach(data => {
      const card = createCard(data.name, data.link, data.likes)
      section.addItem(card)
    })
  })

//--------Создание класса попапа Место
const popupMestoWithForm = new PopupWithForm(
  popupMesto,
  (data) => {
    api.addCard(data.mesto, data.link)
      .then(res => {
        const card = createCard(res.name, res.link, res.likes)
        section.addItem(card);
      })
  }
);

//--------Создание класса информации о пользователе
const userInfo = new UserInfo(profileInfo);

//--------Создание класса попапа Профиль
const popupProfileWithForm = new PopupWithForm(
  popupProfile,
  (res) => {
    api.setUserInfo(res.name, res.about)
    userInfo.setUserInfo(res.name, res.about)
  }
);

//--------Получаем инфо пользователя с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
  })

//--------Слушатель открытия попапа Профиль
editProfileInfoButton.addEventListener('click', () => { 
  const userData = userInfo.getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.about;
  profileFormValidation.resetValidation();
  popupProfileWithForm.open();
});

//--------Слушатель открытия попапа Место
addMestoButton.addEventListener('click', () => {
  mestoFormValidation.toggleButtonState();
  popupMestoWithForm.open();
});

