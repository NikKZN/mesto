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