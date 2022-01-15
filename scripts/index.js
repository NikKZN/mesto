let content = document.querySelector('.content');
let formElement = document.querySelector('.popup__form');
let editProfileInfoButton = content.querySelector('.profile__edit-button');
let closeProfileInfoButton = content.querySelector('.popup__button-close');
let popupOpen = content.querySelector('.popup');


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let userName = document.querySelector('.popup__input-name').value;
    let userPosition = document.querySelector('.popup__input-position').value;
    let profileName = document.querySelector('.profile__profile-name');
    let profilePosition = document.querySelector('.profile__profile-position');
    profileName.textContent = userName;
    profilePosition.textContent = userPosition;
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




/*
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
*/