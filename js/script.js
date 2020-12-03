'use strict';

//Переменные
let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheckBox = document.querySelector('#deposit-check'),
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
  periodAmount = document.querySelector('.period-amount'),
  textInput = document.querySelectorAll('[placeholder=Наименование]'),
  numberInput = document.querySelectorAll('[placeholder=Сумма]');

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
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getInfoDeposit();
    appData.calcPeriod();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    exspensesMonthValue.value = appData.expensesMonth;
    additionalExspensesValue.value = appData.addExpenses.join(', ');
    additionalIncomValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
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
    console.log('cloneIncomeItem: ', cloneIncomeItem);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  inputOnlyRus: function () {
    textInput.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^а-я]/, '');
      });
    });
  },
  inputOnlyNumber: function () {
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
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    //возвращает накопления за месяц (доходы минус расходы)
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    //подсчитывает за какой период будет достигнута цель
    return targetAmount.value / appData.budgetMonth;
  },
  getStatusIncome: function () {
    //определяет уровень дохода
    if (appData.budgetDay > 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(appData.moneyDeposit));

      do {
        appData.percentDeposit = prompt('Какой годовой процент', '10');
      } while (!isNumber(appData.percentDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

start.addEventListener('click', function () {
  if (salaryAmount.value !== '') {
    appData.start();
  }
});

appData.inputOnlyRus();
appData.inputOnlyNumber();
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodAmount);
