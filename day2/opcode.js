const input = Deno.readTextFileSync("opcode.txt");
const opcode = input;

const code = opcode.split(/,/).map((x) => parseInt(x));

const mul = (x, y) => x * y;
const add = (x, y) => x + y;

const intcodeProgram = (code, i, j) => {
  code[1] = i;
  code[2] = j;

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

  const operations = {
    1: performOperation(add),
    2: performOperation(mul),
    99: halt,
  };

  for (let index = 0; index < code.length; index++) {
    if (code[index] in operations) {
      index = operations[code[index]](code, index);
    }
  }

  return code[0];
};

const findNounAndVerb = (code, values) => {
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      if (intcodeProgram([...code], i, j) === 19690720) {
        values.noun = i;
        values.verb = j;
      }
    }
  }
  return ((100 * values.noun) + values.verb);
};

console.log(findNounAndVerb([...code], { noun: 0, verb: 0 }));
