const mul = (x, y) => x * y;
const add = (x, y) => x + y;
const isEqual = (x, y) => x === y ? 1 : 0;
const isLessThan = (x, y) => x < y ? 1 : 0;

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

const paramtersModes = {
  0: positionMode,
  1: immediateMode,
};

const performOperation = (operation) => (code, i, instWithPara) => {
  const value1 = paramtersModes[instWithPara[1]](code, i + 1);
  const value2 = paramtersModes[instWithPara[0]](code, i + 2);
  const outputIndex = code[i + 3];
  code[outputIndex] = operation(+value1, +value2).toString();
  return i + 4;
};

const takeInput = (code, i) => {
  code[code[i + 1]] = prompt("give input value: ");
  return i + 2;
};

const showValue = (code, i) => {
  const value = code[code[i + 1]];
  dbg(value);
  return i + 2;
};

const halt = (code) => {
  return code.length;
};

const jumpIfTrue = (code, i, instWithPara) => {
  const value1 = paramtersModes[instWithPara[1]](code, i + 1);
  const value2 = paramtersModes[instWithPara[0]](code, i + 2);
  return value1 !== "0" ? +value2 : i + 3;
};

const jumpIfFalse = (code, i, instWithPara) => {
  const value1 = paramtersModes[instWithPara[1]](code, i + 1);
  const value2 = paramtersModes[instWithPara[0]](code, i + 2);
  return value1 === "0" ? +value2 : i + 3;
};

const operations = {
  1: performOperation(add),
  2: performOperation(mul),
  3: takeInput,
  4: showValue,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: performOperation(isLessThan),
  8: performOperation(isEqual),
  99: halt,
};

const executeValidInst = (instruction, intcode, index) => {
  const instWithPara = instruction.padStart(4, "0");
  const parsedInst = instWithPara[3];

  if (/010\d|100\d|000\d|110\d/.test(instWithPara)) {
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

const instructions = Deno.readTextFileSync("chance_of_asteriods.txt").split(
  /,/,
);

// const instructions = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99".split(/,/);
excuteIntcode(instructions);
