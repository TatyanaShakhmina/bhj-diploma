/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует');
    }

    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccountBtn = document.querySelector('.create-account');
    const newAccount = App.getModal('modal-new-account');
    createAccountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new Modal(newAccount);
      modal.open();
    });

    const accountBtns = document.querySelectorAll('.account');
    accountBtns.forEach(function(accountBtn) {
      accountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.onSelectAccount(accountBtn);
      });
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      const account = new Account();
      const accounts = account.list(user, callback);
      accounts.forEach(account => {
        this.clear();
        this.renderItem(account);
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountsList = this.element.querySelector('.accounts-panel');
    const accountItems = accountsList.querySelectorAll('.account');
    accountItems.forEach(item => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const currentActive = this.element.querySelector('.account.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }
    element.classList.add('active');

    const accountId = element.getAttribute('data-id');
    App.showPage('transactions', { account_id: accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum.toFixed(2)} ₽</span>
        </a>
      </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const accountsList = this.element.querySelector('.accounts-panel');
    accountsList.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}
