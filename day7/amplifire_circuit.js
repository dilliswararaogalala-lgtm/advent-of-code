import { permutations } from "jsr:@std/collections";

const mul = (x, y) => x * y;
const add = (x, y) => x + y;
const isEqual = (x, y) => x === y ? 1 : 0;
const isLessThan = (x, y) => x < y ? 1 : 0;
const dbg = (x) => {
  console.log(x);
  return x;
};

const intcodeAmplification = (
  instructions,
  shiftingInput,
  previousOutput,
  index = 0,
) => {
  let output = "";
  const input = [shiftingInput, previousOutput];
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
    return (i + 4);
  };

  const takeInput = (code, i) => {
    code[+code[i + 1]] = input[index];
    index++;
    return i + 2;
  };

  const showValue = (code, i) => {
    output = code[+code[i + 1]];
    return i + 2;
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

  const halt = (code) => {
    return output;
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
    return output;
  };

  return (excuteIntcode(instructions));
};

const executeAmplification = (code, combinations) => {
  const allResults = [];
  for (let i = 0; i < combinations.length; i++) {
    let result = 0;
    for (let j = 0; j < combinations[i].length; j++) {
      result = intcodeAmplification([...code], combinations[i][j], result);
    }
    allResults.push(result);
  }
  return allResults.sort((a, b) => +b - +a)[0];
};

const combinations = permutations(["0", "1", "2", "3", "4"]);
const code =
  "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
    .split(/,/);

dbg(executeAmplification(code, combinations));
