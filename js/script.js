'use strict';

let varText = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
Minus, ipsam laboriosam quae dolores neque numquam ipsum doloribus 
quam magni rerum maxime quos dicta esse earum eveniet. Culpa, libero at corrupti
ducimus sed delectus possimus. Delectus veniam sunt, dicta adipisci molestiae, 
ipsam cumque, expedita minus at itaque deserunt odit et in?`,
  varNumber = 123,
  varBoolean = true;

let stringProcessing = function (str) {
  if (typeof str !== 'string') {
    alert('Это не строка');
  } else {
    str = str.trim();
    if (str.length > 30) {
      str = str.substr(0, 30) + '...';
    }
    console.log(str);
  }
};

stringProcessing(varBoolean);
