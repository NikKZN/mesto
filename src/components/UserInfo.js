export default class UserInfo {
  constructor(profileInfo) {
    this._name = document.querySelector(profileInfo.name);
    this._about = document.querySelector(profileInfo.about);
    this._avatar = document.querySelector(profileInfo.avatar)
  };
  //--------Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
    return dataUser;
  };
  //--------Метод, добавляющий новые данные пользователя
  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  };
  //--------Метод добавления аватара
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
};
