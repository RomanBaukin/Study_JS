'use strict';
//Переменные
let money = +prompt('Ваш месячный доход', '50000'),
  income = '10000 фриланс',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую',
    'Коммуналка, бензин, питание'
  ),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов', 'Коммуналка'),
  amount1 = +prompt('Во сколько это обойдётся?', '5000'),
  expenses2 = prompt('Введите обязательную статью расходов', 'Бензин'),
  amount2 = +prompt('Во сколько это обойдётся?', '10000'),
  mission = 1000000,
  period = 12,
  accumulatedMonth,
  budgetDay;

//Функции
let getExpensesMonth = function () {
  //возвращает сумму всех обязательных расходов за месяц
  return amount1 + amount2;
};

let getAccumulatedMonth = function () {
  //возвращает накопления за месяц (доходы минус расходы)
  return money - getExpensesMonth();
};

let getTargetMonth = function () {
  //подсчитывает за какой период будет достигнута цель
  return Math.ceil(mission / accumulatedMonth);
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
console.log(`Месячный бюджет равен ${accumulatedMonth} р.`);
console.log(`Количество месяцев до цели: ${getTargetMonth()}`);
console.log(getStatusIncome());
