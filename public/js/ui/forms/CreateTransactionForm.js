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
    Account.list(User.current(), (response) => {
      const selectElement = this.element.querySelector('#expense-accounts-list');

      if (response && selectElement) {
        selectElement.innerHTML = '';

        response.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          selectElement.appendChild(option);
        });
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
    Transaction.create(data, (response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        const newTransaction = App.getModal('modal-new-transaction');
        const modal = new Modal(newTransaction);
        modal.close();
      }
    });
  }
}