const puzzleInput = "146810-612564";

const dbg = (x) => {
  console.log(x);
  return x;
};

const isInOrder = (input) => {
  return input.split("").sort().join("") === input;
};

const checkPassword = (input) => {
  if (isInOrder(input)) {
    for (let index = 1; index < input.length; index++) {
      if (input[index - 1] === input[index]) {
        return true;
      }
    }
  }
  return false;
};

const countPossiblePasswords = (puzzleInput) => {
  const startValue = puzzleInput[0];
  const endvalue = puzzleInput[1];
  let count = 0;
  for(let i = startValue; i <= endvalue; i++){
    if(checkPassword(i.toString())) count++;
  }

  return count;
}

dbg(countPossiblePasswords(puzzleInput.split(/-/).map(x => +x)));
