'use strict';

// Функции
let showCurrentTimeFirstFormat = function () {
  let today = new Date(),
    currentTime,
    hours,
    minutes,
    seconds,
    firstFormatItem = document.getElementById('time--first-format'),
    indexDay = today.getDay() - 1,
    week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    year = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

  let decCache = [],
    decCases = [2, 0, 1, 1, 1, 2];
  function decOfNum(number, titles) {
    if (!decCache[number]) {
      decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    }
    return titles[decCache[number]];
  }

  hours = today.getHours() + ' ' + decOfNum(today.getHours(), ['час', 'часа', 'часов']);
  minutes = today.getMinutes() + ' ' + decOfNum(today.getMinutes(), ['минута', 'минуты', 'минут']);
  seconds = today.getSeconds() + ' ' + decOfNum(today.getSeconds(), ['секунда', 'секунды', 'секунд']);

  currentTime = `Сегодня ${week[indexDay]}, ${today.getDate()} ${
    year[today.getMonth()]
  } ${today.getFullYear()} года, ${hours} ${minutes} ${seconds}`;

  firstFormatItem.innerHTML = currentTime;
  firstFormatItem.style.color = 'red';
};

let showCurrentTimeSecondFormat = function () {
  let today = new Date(),
    currentTime,
    date,
    month,
    hours,
    minutes,
    seconds,
    year = today.getFullYear(),
    secondFormatItem = document.getElementById('time--second-format');

  let addNull = function (timeValue) {
    if (timeValue.length === 1) {
      timeValue = '0' + timeValue;
    }
    return timeValue;
  };

  date = addNull(today.getDate() + '');
  month = addNull(today.getMonth() + 1 + '');
  hours = addNull(today.getHours() + '');
  minutes = addNull(today.getMinutes() + '');
  seconds = addNull(today.getSeconds() + '');

  currentTime = `${date}.${month}.${year} - ${hours}:${minutes}:${seconds}`;

  secondFormatItem.innerHTML = currentTime;
  secondFormatItem.style.color = 'red';
};

showCurrentTimeFirstFormat();
showCurrentTimeSecondFormat();
setInterval(showCurrentTimeFirstFormat, 1000);
setInterval(showCurrentTimeSecondFormat, 1000);
