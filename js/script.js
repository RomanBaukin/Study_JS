'use strict';
//Переменные
let money,
  income = '10000 фриланс',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Коммуналка, Бензин, Питание'
  ),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses = [],
  mission = 1000000,
  period = 12,
  accumulatedMonth,
  budgetDay,
  expensesAmount;

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

let getExpensesMonth = function () {
  //возвращает сумму всех обязательных расходов за месяц
  let sum = 0,
    dataEntered;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов', 'Коммуналка');

    do {
      dataEntered = prompt('Во сколько это обойдется?');
    } while (!isNumber(dataEntered));

    sum += +dataEntered;
  }
  return sum;
};

expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {
  //возвращает накопления за месяц (доходы минус расходы)
  return money - expensesAmount;
};

let getTargetMonth = function () {
  //подсчитывает за какой период будет достигнута цель
  if (Math.ceil(mission / accumulatedMonth) >= 0) {
    return `Количество месяцев до цели: ${Math.ceil(mission / accumulatedMonth)}`;
  } else {
    return `Цель не будет достигнута`;
  }
};

let getStatusIncome = function () {
  //определяет уровень дохода
  if (budgetDay > 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay >= 0 && budgetDay <= 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что-то пошло не так';
  }
};

let showTypeOf = function (data) {
  //выводит данные и показывает их тип
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);
addExpenses = addExpenses.toLowerCase().split(', ');

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);
console.log(`Дневной бюджет равен ${budgetDay} р.`);
console.log(`Расходы за месяц: ${expensesAmount} р.`);
console.log(`Месячный бюджет равен ${accumulatedMonth} р.`);
console.log(getTargetMonth());
console.log(getStatusIncome());
