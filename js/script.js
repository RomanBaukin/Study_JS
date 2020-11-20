let num = 266219, lastNumber, result = 1;

while (num) {
  lastNumber = num % 10;
  result *= lastNumber;
  num = (num - lastNumber) / 10;
}

result = String(result**3);
console.log(result.substring(0, 2));