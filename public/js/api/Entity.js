/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static url = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    const url = this.url;
    createRequest({
      url: url,
      data: data,
      method: 'GET',
      callback: callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    const url = this.url;
    createRequest({
      url: url,
      data: data,
      method: 'PUT',
      callback: callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const url = this.url;
    createRequest({
      url: url,
      data: data,
      method: 'DELETE',
      callback: callback
    });
  }
}
