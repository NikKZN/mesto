const content = document.querySelector('.content');
const page = document.querySelector('.page');
const formElement = page.querySelector('.popup__container');
const popupProfile = page.querySelector('.popup_type_profile');
const popupMesto = page.querySelector('.popup_type_mesto');
const editProfileInfoButton = page.querySelector('.profile__edit-button');
const closeProfileInfoButton = popupProfile.querySelector('.popup__button-close');
const addMestoButton = page.querySelector('.profile__add-button');
const popupCloseMesto = popupMesto.querySelector('.popup__button-close');
const userName = popupProfile.querySelector('.popup__input_field_name');
const userJob = popupProfile.querySelector('.popup__input_field_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
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
  const cardTemplate = page.querySelector('.template');
  const elementsList = cardTemplate.querySelector('.elements__list');
  const elementsItem = cardTemplate.querySelector('.elements__item');
  const elementCard = cardTemplate.querySelector('.element__card');
  const elementCaptionText = cardTemplate.querySelector('.element__caption-text');
  const elementCaptionLike = cardTemplate.querySelector('.element__caption-like');

function formSubmitHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;
    close(popupProfile);
}

function formSubmitHandlerMesto (evt) {
    evt.preventDefault(); 
    //profileName.textContent = userName.value;
    //profileJob.textContent = userJob.value;
    close(popupMesto);
}

function openPopupProfile() {
    open(popupProfile);
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;
}

function open(popup) {
    popup.classList.add('popup_opened');
}

function close(popup) {
    popup.classList.remove('popup_opened');
}

editProfileInfoButton.addEventListener('click', openPopupProfile);
closeProfileInfoButton.addEventListener('click', () => close(popupProfile));
addMestoButton.addEventListener('click', () => open(popupMesto));
popupCloseMesto.addEventListener('click', () => close(popupMesto));

formElement.addEventListener('submit', formSubmitHandlerProfile);
formElement.addEventListener('submit', formSubmitHandlerMesto);