/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (err) {
        console.error('Ошибка при получении списка счётов:', err);
        return;
      }

      if (response && response.success) {
        const selectElement = this.element.querySelector('.accounts-select');

        if (!selectElement) return;

        selectElement.innerHTML = response.data.reduce((acc, account) => {
          return acc + `<option value="${account.id}">${account.name}</option>`;
        }, '');
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка при создании новой транзакции:', err);
        return;
      }

      if (response && response.success) {
        App.update();
        this.element.reset();
        const modalName = data.type === 'income' ? 'newIncome' : 'newExpense';
        App.getModal(modalName).close();
      }
    });
  }
}