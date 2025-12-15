const mul = (x, y) => x * y;
const add = (x, y) => x + y;
const isEqual = (x, y) => x === y ? 1 : 0;
const isLessThan = (x, y) => x < y ? 1 : 0;

const dbg = (x) => {
  console.log(x);
  return x;
};

const positionMode = (code, i) => {
  return (code[code[i]]);
};

const immediateMode = (code, i) => {
  return (code[i]);
};

let relativeBase = 0;

const relativeMode = (code, i) => {
  const outputIndex =  +code[i] + relativeBase;
  return (code[outputIndex]);
};

const paramtersModes = {
  0: positionMode,
  1: immediateMode,
  2: relativeMode,
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

const showValue = (code, i, instWithPara) => {
  const value = paramtersModes[instWithPara[1]](code, i + 1);
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

const changeRelativeBase = (code, i, instWithPara) => {
  const value = paramtersModes[instWithPara[1]](code, i + 1);
  relativeBase = relativeBase + (+value);
  return i + 2;
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
  9: changeRelativeBase,
  99: halt,
};

const executeValidInst = (instruction, intcode, index) => {
  const instWithPara = instruction.padStart(4, "0");
  const parsedInst = instWithPara[3];

  if (/010\d|100\d|000\d|110\d|020\d|120\d|200\d|210\d/.test(instWithPara)) {
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

const instructions = Deno.readTextFileSync("input.txt").split(
  /,/,
);

// const instructions = "109,1,204,-1,101,100,1,100,1008,100,16,101,1006,101,0,99"
//   .split(/,/);

excuteIntcode(instructions);

