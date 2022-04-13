import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import {
  popupProfile,
  popupMesto,
  popupImage,
  popupConfirm,
  popupAvatar,
  formPopupAvatar,
  formPopupMesto,
  formPopupProfile,
  editProfileInfoButton,
  editAvatarButton,
  addMestoButton,
  userName,
  userJob,
  profileInfo,
  listElement,
  cardSelector,
  config,
} from "../utils/constants.js";

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    userInfo.setUserInfo(res[0].name, res[0].about)
    userInfo.setUserAvatar(res[0].avatar)
    userId = res[0]._id;
    section.renderItems(res[1]);
  })
  .catch(console.log)  

//--------Валидация
const profileFormValidation = new FormValidator(config, formPopupProfile);
const mestoFormValidation = new FormValidator(config, formPopupMesto);
const avatarFormValidation = new FormValidator(config, formPopupAvatar);
profileFormValidation.enableValidation();
mestoFormValidation.enableValidation();
avatarFormValidation.enableValidation();

//--------Функция создания карточки
const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    cardSelector,
    (name, link) => {
      popupCardImage.open(name, link);
    },
    (id) => {
      popupConfirmDel.open();
      popupConfirmDel.changeFormSubmit(() => {
        popupConfirmDel.showLoading('Удаление...');
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupConfirmDel.close();
          })
          .catch(console.log)
          .finally(() => {
            popupConfirmDel.showLoading('Да');
          });
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.likesCount(res.likes)
        })
        .catch(console.log) 
      } else {
        api.addLike(id)
        .then(res => {
          card.likesCount(res.likes)
        })
        .catch(console.log)
      }      
    }  
  )
  return card.generateCard();
};

//--------Сабмиты
const handleCardFormSubmit = (data) => {
  popupMestoWithForm.showLoading('Сохранение...');
  api.addCard(data.mesto, data.link)
    .then(res => {
      const card = createCard(res)
      section.addItem(card);
      popupMestoWithForm.close();
    })
    .catch(console.log)
    .finally(() => {
      popupMestoWithForm.showLoading('Создать');
    });
};

const handleProfileFormSubmit = (res) => {
  popupProfileWithForm.showLoading('Сохранение...');
  api.setUserInfo(res.name, res.about)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      popupProfileWithForm.close();
    })
    .catch(console.log)
    .finally(() => {
      popupProfileWithForm.showLoading('Сохранить');
    });
};

const handleAvatarFormSubmit = (data) => {
  popupAvatarWithForm.showLoading('Сохранение...');
  api.changeUserAvatar(data.link)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatarWithForm.close();
    })
    .catch(console.log)
    .finally(() => {
      popupAvatarWithForm.showLoading('Сохранить');
    });
};

//--------Создание классов
const popupMestoWithForm = new PopupWithForm(popupMesto, handleCardFormSubmit);
const popupProfileWithForm = new PopupWithForm(popupProfile, handleProfileFormSubmit);
const popupAvatarWithForm = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
const popupConfirmDel = new PopupWithForm(popupConfirm);
const userInfo = new UserInfo(profileInfo);
const section = new Section({
    renderer: (item) => section.addItem(createCard(item))
  },
  listElement
  );
const popupCardImage = new PopupWithImage(popupImage);

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

//--------Слушатель открытия попапа Аватар
editAvatarButton.addEventListener('click', () => {
  avatarFormValidation.toggleButtonState();
  popupAvatarWithForm.open();
});