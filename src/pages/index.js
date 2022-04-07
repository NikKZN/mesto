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

//console.log(api.getInitialCards())
//console.log(api.getUserInfo())
//console.log(api.setUserInfo('ggg', 'fff'))
//console.log(api.createCard('fff', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'))



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

//--------Загрузка карточек с сервера
api.getInitialCards()
  .then(res => {
    const section = new Section({
      items: res,
      renderer: (item) => {
        section.addItem(createCard(item.name, item.link));
      }
    },
    listElement
  );
  section.renderItems();
  })
/*
//--------Создание класса секции карточек
const section = new Section({
    items: initialCards,
    renderer: (item) => {
      //section.addItem(createCard(item.name, item.link));
    }
  },
  listElement
);
section.renderItems();
*/


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
    api.setUserInfo(data.name, data.about)
    userInfo.setUserInfo(data)
  }
);

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data)
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

