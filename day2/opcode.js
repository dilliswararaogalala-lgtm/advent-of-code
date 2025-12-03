const input = Deno.readTextFileSync("opcode.txt");
const code = input;

const opcodes = code.split(/,/).map(x => parseInt(x));
opcodes[1] = 12
opcodes[2] = 2

const mul = (x, y) => x * y;
const add = (x, y) => x + y;

const programAlaram = (code) => {
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

  for (let i = 0; i < code.length; i++) {
    if (code[i] in operations) {
      i = operations[code[i]](code, i);
    }
  }

  return code
};

console.log(programAlaram(opcodes)[0]);

