/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка при создании счёта:', err);
        return;
      }

      if (response && response.success) {
        App.update();
        App.getModal('createAccount').close();
      }
    });
  }
}