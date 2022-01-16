let content = document.querySelector('.content');
let editProfileInfoButton = content.querySelector('.profile__edit-button');
let page = document.querySelector('.page');
let formElement = page.querySelector('.popup__container');
let closeProfileInfoButton = page.querySelector('.popup__button-close');
let popupOpen = page.querySelector('.popup_type_profile');



function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let userName = page.querySelector('.popup__input-name').value;
    let userJob = page.querySelector('.popup__input-job').value;
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    profileName.textContent = userName;
    profileJob.textContent = userJob;
    popupOpen.classList.remove('popup_opened'); 
}

formElement.addEventListener('submit', formSubmitHandler);

closeProfileInfoButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupOpen.classList.remove('popup_opened'); 
});

editProfileInfoButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupOpen.classList.add('popup_opened');
});