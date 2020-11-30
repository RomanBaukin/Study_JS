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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 3,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome, cashIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome));

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'интернЕт, Бензин   ,     питание'
    );
    appData.addExpenses = addExpenses.toLowerCase().split(','); // для разделения строки на элементы массива

    for (let key in appData.addExpenses) {
      // убираем лишние пробелы и делаем первую букву заглавной
      appData.addExpenses[key] = appData.addExpenses[key].trim(); //убираем лишние пробелы
      appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let answer1, answer2;

      do {
        answer1 = prompt('Введите обязательную статью расходов');
      } while (isNumber(answer1));

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
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log(`Период равен ${appData.period} месяцев`);
console.log(`Цель заработать ${appData.mission} рублей`);
console.log(`Возможные расходы: ${appData.addExpenses.join(', ')}`);
console.log(`Дневной бюджет равен ${appData.budgetDay} р.`);
console.log(`Расходы за месяц: ${appData.expensesMonth} р.`);
console.log(`Месячный бюджет равен ${appData.budgetMonth} р.`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}
