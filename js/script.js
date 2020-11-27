'use strict';

let myDate = new Date(),
  indexDay = myDate.getDay() - 1,
  week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

for (let key in week) {
  if ((week[key] === 'Суббота' && +key === indexDay) || (week[key] === 'Воскресенье' && +key === indexDay)) {
    week[key] = week[key].italics().bold();
  } else if (week[key] === 'Суббота' || week[key] === 'Воскресенье') {
    week[key] = week[key].italics();
  } else if (+key === indexDay) {
    week[key] = week[key].bold();
  }
  document.getElementById('week').innerHTML += week[key] + '<br>';
}
