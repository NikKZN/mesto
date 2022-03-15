export const page = document.querySelector('.page');
export const popupProfile = page.querySelector('.popup_type_profile');
export const popupMesto = page.querySelector('.popup_type_mesto');
export const popupImage = page.querySelector('.popup_type_image');
export const formPopupMesto = popupMesto.querySelector('.popup__form');
export const formPopupProfile = popupProfile.querySelector('.popup__form');
export const closePopapImage = popupImage.querySelector('.popup__button-close');
export const editProfileInfoButton = page.querySelector('.profile__edit-button');
export const closeProfileInfoButton = popupProfile.querySelector('.popup__button-close');
export const addMestoButton = page.querySelector('.profile__add-button');
export const popupCloseMesto = popupMesto.querySelector('.popup__button-close');
export const userName = popupProfile.querySelector('.popup__input_field_name');
export const userJob = popupProfile.querySelector('.popup__input_field_job');
export const profileName = page.querySelector('.profile__name');
export const profileJob = page.querySelector('.profile__job');
export const mestoName = popupMesto.querySelector('.popup__input_field_mesto');
export const mestoLink = popupMesto.querySelector('.popup__input_field_link');
export const listElement = page.querySelector('.elements__list');
export const imageCard = popupImage.querySelector('.popup__image');
export const captionCard = popupImage.querySelector('.popup__caption');
export const cardSelector = page.querySelector('.template');
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
