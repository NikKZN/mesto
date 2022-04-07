/*
const result = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};*/

const result = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export default class Api {
  constructor(settings) {
    this._settings = settings;
  };
  //---Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      headers: this._settings.headers
    })
    .then(result)
    .catch(console.log)
  };
  
  //---Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._settings.baseUrl}/cards`, {
      headers: this._settings.headers
    })
    .then(result)
    .catch(console.log)
  }
  
  //---Редактирование профиля
  setUserInfo(name, about) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._settings.headers,
      body: JSON.stringify({
        name,
        about
      })      
    })
    .then(result)
    .catch(console.log);
  }
  /*
  //---Добавление новой карточки
  createCard(name, link) {
    return fetch(`${this._settings.baseUrl}/cards`, {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(result); 
  }
  //---Отображение количества лайков карточки
  */
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'd9d0f8c2-9510-4f6f-b039-ce74201bfd31',
    'Content-Type': 'application/json'
  }
});

