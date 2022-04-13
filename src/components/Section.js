export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;    
    this._container = containerSelector;
  };
  //--------Метод отрисовки карточек  
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  };
  //--------Метод добавления карточек в контейнер
  addItem(element) {
    this._container.prepend(element);
  };
};