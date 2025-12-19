let value = 40;

console.log(Array.from({ length: 30 }, () => {
  value += 1;
  return value;
}));

value = 50;

console.log(Array.from({ length: 68 }, () => {
  if(value === 0){
    value = 99;
    return value;
  }
  value -= 1;
  return value;
}));

const inputs = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82"

console.log(inputs.split(/\n/));