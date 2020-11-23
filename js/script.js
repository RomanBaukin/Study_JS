'use strict';

let lang = prompt('Введите "ru" или "en"'),
  dayOfTheWeekArray = [],
  dayOfTheWeekIfElse,
  dayOfTheWeekSwitchCase,
  namePerson = prompt('Введите имя'),
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

dayOfTheWeekArray.ru = 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
dayOfTheWeekArray.en = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

statusPerson = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';

console.log(dayOfTheWeekIfElse);
console.log(dayOfTheWeekSwitchCase);
console.log(dayOfTheWeekArray[lang]);
console.log(statusPerson);
