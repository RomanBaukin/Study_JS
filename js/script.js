let money = 50000;
let income = '10000 фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = true;
let mission = 1000000; 
let period = 12;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(`Дневной бюджет равен ${budgetDay} р.`);