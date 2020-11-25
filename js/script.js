'use strict';

// Первое задание
let arr = [];

let isNumber = function (n) {
  //проверяет, являются ли входящие данные числом
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let outputNumberTwoAndFour = function () {
  let indexArr = 0;
  let multiDigitNumber;
  for (let i = 0; i < 7; i++) {
    do {
      multiDigitNumber = prompt('Введите любое многозначное число');
    } while (!isNumber(multiDigitNumber));

    arr[i] = multiDigitNumber;
  }

  while (indexArr < 7) {
    if (arr[indexArr][0] === '2' || arr[indexArr][0] === '4') {
      console.log(arr[indexArr]);
    }
    indexArr++;
  }
};

outputNumberTwoAndFour();

// Второе задание
let inputNumber;

do {
  inputNumber = prompt('Введите любое многозначное число', '100');
} while (!isNumber(inputNumber));

let naturalNumbers = function (number) {
  for (let i = 2; i <= number; i++) {
    let flag = 1;
    for (let j = 2; j <= i / 2 && flag === 1; j++) {
      if (i % j === 0) {
        flag = 0;
      }
    }
    if (flag === 1) {
      console.log(`${i} Делители этого числа: 1 и ${i}`);
    }
  }
};

naturalNumbers(+inputNumber);
