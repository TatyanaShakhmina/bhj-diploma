/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static url = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    const url = `${this.url}/${id}`;
    createRequest({
      url: url,
      data: null,
      method: 'GET',
      callback: callback
    });
  }
}
