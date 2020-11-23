'use strict';

let lang = prompt('Введите "ru" или "en"'),
  arrDayOfTheWeek = [
    ['Понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ],
  dayOfTheWeekIfElse,
  dayOfTheWeekSwitchCase,
  dayOfTheWeekArray = lang === 'ru' ? arrDayOfTheWeek[0] : arrDayOfTheWeek[1],
  namePerson = prompt('Введите имя или статус'),
  statusPerson;

if (lang === 'ru') {
  dayOfTheWeekIfElse = 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
} else {
  dayOfTheWeekIfElse = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';
}

switch (lang) {
  case 'ru':
    dayOfTheWeekSwitchCase = 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
    break;
  case 'en':
    dayOfTheWeekSwitchCase = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';
}

statusPerson = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';

console.log(dayOfTheWeekIfElse);
console.log(dayOfTheWeekSwitchCase);
console.log(dayOfTheWeekArray);
console.log(statusPerson);
