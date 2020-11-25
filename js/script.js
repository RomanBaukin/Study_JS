'use strict';

// Первое задание
let arr = [];

let outputNumberTwoAndFour = function () {
  let indexArr = 0;
  for (let i = 0; i < 7; i++) {
    arr[i] = prompt('Введите многозначное число');
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
let inputNumber = +prompt('Введите любое многозначное число', '100');

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

naturalNumbers(inputNumber);
