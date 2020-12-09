'use strict';

//Переменные
const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheckBox = document.getElementById('deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  exspensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExspensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  expensesTitle = document.querySelector('input.expenses-title'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

// Функции;
const isNumber = function (n) {
  //проверяет, являются ли входящие данные числом
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Класс
class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = depositCheckBox.checked;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 0;
  }

  start() {
    if (salaryAmount.value !== '') {
      const allInput = document.querySelectorAll('[type=text]');
      cancel.style = 'display: block';
      start.style = 'display: none';
      allInput.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.calcPeriod();
      this.getBudget();

      this.showResult();
    }
  }

  reset() {
    const allInput = document.querySelectorAll('[type=text]'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 1;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    this.showResult();

    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    targetMonthValue.value = 0;

    expensesItems.forEach(function (item, index) {
      if (index !== 0) {
        item.remove();
      }
    });

    incomeItems.forEach(function (item, index) {
      if (index !== 0) {
        item.remove();
      }
    });

    cancel.style.display = 'none';
    start.style.display = 'block';
    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';

    allInput.forEach(function (item) {
      item.value = '';
      item.removeAttribute('disabled', 'disabled');
    });
  }

  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    exspensesMonthValue.value = this.expensesMonth;
    additionalExspensesValue.value = this.addExpenses.join(', ');
    additionalIncomValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = _this.calcPeriod();
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = cloneExpensesItem.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = cloneIncomeItem.children[1].value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  inputOnlyRus() {
    const textInput = document.querySelectorAll('[placeholder=Наименование]');

    textInput.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-я\, ]/, '');
      });
    });
  }

  inputOnlyNumber() {
    const numberInput = document.querySelectorAll('[placeholder=Сумма]');

    numberInput.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }

  changePeriodAmount() {
    periodAmount.textContent = periodSelect.value;
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);

    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    //возвращает сумму всех обязательных расходов за месяц
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget() {
    //возвращает накопления за месяц (доходы минус расходы)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    //подсчитывает за какой период будет достигнута цель
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    //определяет уровень дохода
    if (this.budgetDay > 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(this.moneyDeposit));

      do {
        this.percentDeposit = prompt('Какой годовой процент', '10');
      } while (!isNumber(this.percentDeposit));
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  eventListeners() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
    this.inputOnlyRus();
    this.inputOnlyNumber();
  }
}

const appData = new AppData();

appData.eventListeners();
