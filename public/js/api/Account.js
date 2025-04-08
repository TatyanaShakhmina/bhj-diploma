/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    const URL = `${this.URL}/${id}`;
    createRequest({
      URL: URL,
      data: null,
      method: 'GET',
      callback: callback
    });
  }
}
