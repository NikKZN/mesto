export default class UserInfo {
  constructor(profileInfo) {
    this._name = document.querySelector(profileInfo.name);
    this._job = document.querySelector(profileInfo.job);
  };
  //--------Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return dataUser;
  };
  //--------Метод, добавляющий новые данные пользователя
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  };
};
