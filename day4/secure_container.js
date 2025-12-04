const puzzleInput = "146810-612564";

const dbg = (x) => {
  console.log(x);
  return x;
};

const isInOrder = (input) => {
  return input.split("").sort().join("") === input;
};

const frequencyTable = (input) => {
  const frequency = (table, currentNumber) => {
    table[currentNumber] = table[currentNumber] || 0;
    table[currentNumber] += 1;
    return table;
  };
  return input.reduce(frequency, {});
};

const checkPassword = (input) => {
  if (isInOrder(input)) {
    const occurences = frequencyTable(input.split(""));
    for (const key in occurences) {
      if (occurences[key] === 2) return true;
    }
  }
  return false;
};

const countPossiblePasswords = (puzzleInput) => {
  const startValue = puzzleInput[0];
  const endvalue = puzzleInput[1];
  let count = 0;
  for (let i = startValue; i <= endvalue; i++) {
    if (checkPassword(i.toString())) count++;
  }

  return count;
};

//dbg(checkPassword("111122"))
dbg(countPossiblePasswords(puzzleInput.split(/-/).map((x) => +x)));
