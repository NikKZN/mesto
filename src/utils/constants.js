export const popupProfile = document.querySelector('.popup_type_profile');
export const popupMesto = document.querySelector('.popup_type_mesto');
export const popupImage = document.querySelector('.popup_type_image');
export const popupConfirm = document.querySelector('.popup_type_confirm');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form')
export const formPopupMesto = popupMesto.querySelector('.popup__form');
export const formPopupProfile = popupProfile.querySelector('.popup__form');
export const closePopapImage = popupImage.querySelector('.popup__button-close');
export const editProfileInfoButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__edit-avatar');
export const addMestoButton = document.querySelector('.profile__add-button');
export const userName = popupProfile.querySelector('.popup__input_field_name');
export const userJob = popupProfile.querySelector('.popup__input_field_job');
export const listElement = document.querySelector('.elements__list');
export const cardSelector = document.querySelector('.template');

//--------Объект с селекторами информации пользователя
export const profileInfo = {
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
};

//--------Объект настроек валидации
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};