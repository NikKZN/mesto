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

//--------Получаем инфо пользователя с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    userInfo.setUserAvatar(res.avatar)
    userId = res._id;
  });

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
    cardSelector,
    (name, link) => {
      popupCardImage.open(name, link);
    },
    (id) => {
      popupConfirmDel.open();
      popupConfirmDel.changeFormSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupConfirmDel.close();
          })
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.likesCount(res.likes)
        }) 
      } else {
        api.addLike(id)
        .then(res => {
          card.likesCount(res.likes)
        })
      }      
    }  
  )
  return card.generateCard();
};

//--------Загрузка карточек с сервера
api.getInitialCards()
  .then(res => {
    res.reverse().forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      section.addItem(card)
    })
  })

//--------Сабмиты
const handleCardFormSubmit = (data) => {
  popupMestoWithForm.showLoading('Сохранение...');
  api.addCard(data.mesto, data.link)
    .then(res => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      section.addItem(card);
    })
    .catch(console.log)
    .finally(() => {
      popupMestoWithForm.showLoading('Создать');
    });
};

const handleProfileFormSubmit = (res) => {
  popupProfileWithForm.showLoading('Сохранение...');
  api.setUserInfo(res.name, res.about)
    .catch(console.log)
    .finally(() => {
      popupProfileWithForm.showLoading('Сохранить');
    });
  userInfo.setUserInfo(res.name, res.about, res.avatar);
};

const handleAvatarFormSubmit = (data) => {
  popupAvatarWithForm.showLoading('Сохранение...');
  api.changeUserAvatar(data.link)
    .then(res => {
      userInfo.setUserAvatar(res.avatar)
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
const section = new Section({ items: [], renderer: createCard }, listElement);
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
})