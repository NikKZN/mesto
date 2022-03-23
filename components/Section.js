export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;    
    this._container = containerSelector;
  };
  //--------Метод отрисовки карточек  
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  };
  //--------Метод добавления карточек в контейнер
  addItem(element) {
    this._container.prepend(element);
  };
};