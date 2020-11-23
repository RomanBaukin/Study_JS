'use strict';

let money = +prompt('Ваш месячный доход'),
  income = '10000 фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов'),
  amount1 = +prompt('Во сколько это обойдётся?'),
  expenses2 = prompt('Введите обязательную статью расходов'),
  amount2 = +prompt('Во сколько это обойдётся?'),
  mission = 1000000,
  period = 12,
  budgetMonth = money - amount1 - amount2,
  budgetDay = Math.floor(budgetMonth / 30),
  monthsToTarget = Math.ceil(mission / budgetMonth),
  incomeLevel;

addExpenses = addExpenses.toLowerCase().split(', ');

if (budgetDay > 1200) {
  incomeLevel = 'У вас высокий уровень дохода';
} else if (budgetDay > 600 && budgetDay <= 1200) {
  incomeLevel = 'У вас средний уровень дохода';
} else if (budgetDay >= 0 && budgetDay <= 600) {
  incomeLevel = 'К сожалению у вас уровень дохода ниже среднего';
} else {
  incomeLevel = 'Что-то пошло не так';
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);
console.log(`Дневной бюджет равен ${budgetDay} р.`);
console.log(`Месячный бюджет равен ${budgetMonth} р.`);
console.log(`Количество месяцев до цели: ${monthsToTarget}`);
console.log(incomeLevel);
