const mul = (x, y) => x * y;
const add = (x, y) => x + y;

const dbg = (x) => {
  console.log(x);
  return x;
};

const intcodeProgram = (code) => {
  const performOperation = (operation) => (code, i) => {
    const value1 = code[code[i + 1]];
    const value2 = code[code[i + 2]];
    const outputIndex = code[i + 3];
    code[outputIndex] = operation(value1, value2);
    return (i + 3);
  };

  const halt = (code) => {
    return code.length;
  };

  const takeInput = (code, i) => {
    code[i + 1] = +prompt("give input value: ");
    return i + 1;
  };

  const showValue = (code, i) => {
    const value = code[code[i + 1]];
    console.log(value);
    return i + 1;
  };

  const operations = {
    1: performOperation(add),
    2: performOperation(mul),
    3: takeInput,
    4: showValue,
    99: halt,
  };

  for (let index = 0; index < code.length; index++) {
    if (code[index] in operations) {
      index = operations[code[index]](code, index);
    }
  }

  return code;
};

const inputCode = "1,0,0,1,3,1,4,1,99";

dbg(intcodeProgram(inputCode.split(/,/).map((x) => +x)));
