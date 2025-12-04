const mul = (x, y) => x * y;
const add = (x, y) => x + y;
const isEqual = (x, y) => x === y ? 1 : 0;

const dbg = (x) => {
  console.log(x);
  return x;
};

const positionMode = (code, i) => {
  return code[code[i]];
};

const immediateMode = (code, i) => {
  return code[i];
};

const parameters = {
  0: positionMode,
  1: immediateMode,
};

const performOperation = (operation) => (code, i, instWithPara) => {
  const isParaForInput1 = instWithPara[1] === "0" || instWithPara[1] === "1";
  const isParaForInput2 = instWithPara[0] === "0" || instWithPara[0] === "1";

  if (isParaForInput1 && isParaForInput2) {
    const value1 = parameters[instWithPara[1]](code, i + 1);
    const value2 = parameters[instWithPara[0]](code, i + 2);
    const outputIndex = code[i + 3];
    code[outputIndex] = operation(+value1, +value2).toString();
    return i + 4;
  }

  return i;
};

const takeInput = (code, i) => {
  code[code[i + 1]] = prompt("give input value: ");
  return i + 2;
};

const showValue = (code, i) => {
  const value = code[code[i + 1]];
  console.log(value);
  return i + 2;
};

const halt = (code) => {
  return code.length;
};

const operations = {
  1: performOperation(add),
  2: performOperation(mul),
  3: takeInput,
  4: showValue,
  8: performOperation(isEqual),
  99: halt,
};

const executeValidInst = (instruction, intcode, index) => {
  const instWithPara = instruction.padStart(4, "0");
  const parsedInst = instWithPara[3];
  if (parsedInst in operations) {
    return operations[parsedInst](intcode, index, instWithPara);
  }
  return index;
};

const excuteIntcode = (instructions) => {
  let i = 0;
  while (i < instructions.length && instructions[i] !== "99") {
    i = executeValidInst(instructions[i], instructions, i);
  }
  return instructions;
};

// const instructions = Deno.readTextFileSync("chance_of_asteriods.txt").split(
//   /,/,
// );

const instructions = "3,9,8,9,10,9,4,9,99,-1,8".split(/,/)
excuteIntcode(instructions);
