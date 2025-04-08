/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует');
    }

    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeBtn = document.querySelector('.create-income-button');
    const modalNewIncome = App.getModal('modal-new-income');
    createIncomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new Modal(modalNewIncome);
      modal.open();
    });

    const createExpenseBtn = document.querySelector('.create-expense-button');
    const modalNewExpense = App.getModal('modal-new-expense');
    createExpenseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new Modal(modalNewExpense);
      modal.open();
    });
  }
}
