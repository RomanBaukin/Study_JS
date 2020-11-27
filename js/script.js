'use strict';

//Переменные
let money;

//Функции
let isNumber = function (n) {
  //проверяет, являются ли входящие данные числом
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function () {
  // останавливает выполнение кода, если не ввести число
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

// Объект
let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 12,
  asking: function () {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'Коммуналка, Бензин, Питание'
    );
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let answer1 = prompt('Введите обязательную статью расходов'),
        answer2;

      do {
        answer2 = prompt('Во сколько это обойдется?');
      } while (!isNumber(answer2));

      appData.expenses[answer1] = +answer2;
    }
  },
  getExpensesMonth: function () {
    //возвращает сумму всех обязательных расходов за месяц
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    //возвращает накопления за месяц (доходы минус расходы)
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    //подсчитывает за какой период будет достигнута цель
    if (Math.ceil(appData.mission / appData.budgetMonth) >= 0) {
      return `Количество месяцев до цели: ${Math.ceil(appData.mission / appData.budgetMonth)}`;
    } else {
      return `Цель не будет достигнута`;
    }
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
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Период равен ${appData.period} месяцев`);
console.log(`Цель заработать ${appData.mission} рублей`);
console.log(`Дневной бюджет равен ${appData.budgetDay} р.`);
console.log(`Расходы за месяц: ${appData.expensesMonth} р.`);
console.log(`Месячный бюджет равен ${appData.budgetMonth} р.`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}
