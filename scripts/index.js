const content = document.querySelector('.content');
const page = document.querySelector('.page');
const formElement = page.querySelector('.popup__container');
const popupProfile = page.querySelector('.popup_type_profile');
const popupMesto = page.querySelector('.popup_type_mesto');
const popupImage = page.querySelector('.popup_type_image');
const closePopapImage = popupImage.querySelector('.popup__button-close');
const editProfileInfoButton = page.querySelector('.profile__edit-button');
const closeProfileInfoButton = popupProfile.querySelector('.popup__button-close');
const addMestoButton = page.querySelector('.profile__add-button');
const popupCloseMesto = popupMesto.querySelector('.popup__button-close');
const userName = popupProfile.querySelector('.popup__input_field_name');
const userJob = popupProfile.querySelector('.popup__input_field_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const mestoName = popupMesto.querySelector('.popup__input_field_mesto');
const mestoLink = popupMesto.querySelector('.popup__input_field_link');
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

const cardTemplate = page.querySelector('.template').content; //Находим template
const elementsList = page.querySelector('.elements__list'); //Находим место вставки

function render() {
  initialCards.forEach(renderItem); //Перебираем массив
}

function renderItem(item) {
  //------Клонируем массив и создаём новые карточки
  const newItem = cardTemplate.cloneNode(true);
  newItem.querySelector('.element__caption-text').textContent = item.name;
  const elementCard = newItem.querySelector('.element__card');
  elementCard.src = item.link;
  elementCard.alt = item.name;
  //------Открытие попапа просмотра изображения карточки
  elementCard.addEventListener('click', function() { 
    open(popupImage);
    popupImage.querySelector('.popup__image').src = item.link;
    popupImage.querySelector('.popup__image').alt = item.name;
    popupImage.querySelector('.popup__caption').textContent = item.name;
  });
  //------Ставим/убираем лайк
  const likeButtonCard = newItem.querySelector('.element__caption-like');
  likeButtonCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__caption-like_aktive');
  });
  //------Удаление карточки
  const deleteButtonCard = newItem.querySelector('.element__trash');
  deleteButtonCard.addEventListener('click', () => {
    deleteButtonCard.closest('.elements__item').remove();
  });
  //------Добавляем элементы в DOM
  elementsList.prepend(newItem);
}
//--------Форма отправки данных пользователя
function formSubmitHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;
    close(popupProfile);
}
//--------Форма отправки данных места
function formSubmitHandlerMesto (evt) {
    evt.preventDefault();
    renderItem({name: mestoName.value, link: mestoLink.value});
    mestoName.value = '';
    mestoLink.value = '';
    close(popupMesto);
}
//--------Функция открытия попапа профиля
function openPopupProfile() {
    open(popupProfile);
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;
}
//--------Функция открытия попапа
function open(popup) {
    popup.classList.add('popup_opened');
}
//--------Функция закрытия попапа
function close(popup) {
    popup.classList.remove('popup_opened');
}

editProfileInfoButton.addEventListener('click', openPopupProfile); //Слушатель открытия попапа профиль
closeProfileInfoButton.addEventListener('click', () => close(popupProfile)); //Слушатель закрытия попапа профиль
addMestoButton.addEventListener('click', () => open(popupMesto)); //Слушатель открытия попапа место
popupCloseMesto.addEventListener('click', () => close(popupMesto)); //Слушатель закрытия попапа место
closePopapImage.addEventListener('click', () => close(popupImage)); //Слушатель закрытия попапа просмотра изображения карточки

popupProfile.addEventListener('submit', formSubmitHandlerProfile); //Слушатель отправки формы профиль
popupMesto.addEventListener('submit', formSubmitHandlerMesto); //Слушатель отправки формы место
render();