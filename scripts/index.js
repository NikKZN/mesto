let content = document.querySelector('.content');
let editProfileInfoButton = content.querySelector('.profile__edit-button');
let page = document.querySelector('.page');
let formElement = page.querySelector('.popup__container');
let closeProfileInfoButton = page.querySelector('.popup__button-close');
let popupOpen = page.querySelector('.popup_type_profile');
let userName = page.querySelector('.popup__input_field_name');
let userJob = page.querySelector('.popup__input_field_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;
    popupOpen.classList.remove('popup_opened'); 
}

formElement.addEventListener('submit', formSubmitHandler);

function openPopup () {
    popupOpen.classList.toggle('popup_opened');
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;
}

closeProfileInfoButton.addEventListener('click', openPopup);

editProfileInfoButton.addEventListener('click', openPopup);