'use strict';

//Переменные
let start = document.getElementById('start'),
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
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelector('input.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

// Функции;
let isNumber = function (n) {
  //проверяет, являются ли входящие данные числом
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Объект
let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: depositCheckBox.checked,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 0,
  start: function () {
    if (salaryAmount.value !== '') {
      let allInput = document.querySelectorAll('[type=text]');
      cancel.style = 'display: block';
      start.style = 'display: none';
      allInput.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.calcPeriod();
      this.getBudget();

      this.showResult();
    }
  },
  reset: function () {
    let allInput = document.querySelectorAll('[type=text]'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    // budgetMonthValue.value = 0;
    // budgetDayValue.value = 0;
    // exspensesMonthValue.value = 0;
    // additionalExspensesValue.value = '';
    // additionalIncomValue.value = '';
    // targetMonthValue.value = 0;
    // incomePeriodValue.value = 0;
    // incomePeriodValue.value = 0;

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

    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    exspensesMonthValue.value = this.expensesMonth;
    additionalExspensesValue.value = this.addExpenses.join(', ');
    additionalIncomValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = cloneExpensesItem.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = cloneIncomeItem.children[1].value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  inputOnlyRus: function () {
    let textInput = document.querySelectorAll('[placeholder=Наименование]');

    textInput.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-я\, ]/, '');
      });
    });
  },
  inputOnlyNumber: function () {
    let numberInput = document.querySelectorAll('[placeholder=Сумма]');

    numberInput.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  },
  changePeriodAmount: function () {
    periodAmount.textContent = periodSelect.value;
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    //возвращает сумму всех обязательных расходов за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    //возвращает накопления за месяц (доходы минус расходы)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    //подсчитывает за какой период будет достигнута цель
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
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
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(this.moneyDeposit));

      do {
        this.percentDeposit = prompt('Какой годовой процент', '10');
      } while (!isNumber(this.percentDeposit));
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

appData.inputOnlyRus();
appData.inputOnlyNumber();
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', appData.changePeriodAmount.bind(appData));
