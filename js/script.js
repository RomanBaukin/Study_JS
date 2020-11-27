'use strict';

let myDate = new Date();
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

week[myDate.getDay() - 1] = week[myDate.getDay() - 1].bold();

for (let item of week) {
  if (item === 'Суббота' || item === 'Воскресенье') {
    item = item.italics();
  }
  document.getElementById('week').innerHTML += item + '<br>';
}
