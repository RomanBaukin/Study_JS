'use strict';

let advertising = document.querySelector('.adv'),
  books = document.querySelector('.books'),
  book1 = document.querySelectorAll('.book')[1],
  book2 = document.querySelectorAll('.book')[0],
  book3 = document.querySelectorAll('.book')[4],
  book4 = document.querySelectorAll('.book')[3],
  book5 = document.querySelectorAll('.book')[5],
  book6 = document.querySelectorAll('.book')[2],
  chaptersBook2 = document.querySelectorAll('ul')[0],
  chaptersBook5 = document.querySelectorAll('ul')[5];

advertising.remove();
books.append(book6);
books.prepend(book1);
book4.before(book3);
document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';
chaptersBook2.children[2].before(chaptersBook2.children[3]);
chaptersBook2.children[3].before(chaptersBook2.children[6]);
chaptersBook2.children[4].before(chaptersBook2.children[8]);
chaptersBook2.children[10].before(chaptersBook2.children[5]);
chaptersBook5.children[2].before(chaptersBook5.children[9]);
chaptersBook5.children[5].after(chaptersBook5.children[3]);
chaptersBook5.children[8].after(chaptersBook5.children[6]);
book3.children[0].children[0].textContent = 'Книга 3. this и Прототипы Объектов';

console.log(book3);
