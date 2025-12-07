import { permutations } from "jsr:@std/collections";

const mul = (x, y) => (x * y);
const add = (x, y) => (x + y);
const isEqual = (x, y) => x === y ? 1 : 0;
const isLessThan = (x, y) => x < y ? 1 : 0;
const dbg = (x) => {
  console.log(x);
  return x;
};

const amplification = (
  { program, shiffter, inputIndex, previousOutput, currentIndex, isTheEnd },
) => {
  let index = inputIndex;
  const inputs = [shiffter, previousOutput];

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
    code[+code[i + 1]] = inputs[index];
    //dbg(code[+code[i + 1]])
    index++;
    return i + 2;
  };

  const showValue = (code, i) => {
    previousOutput = code[+code[i + 1]];
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
    return code.length;
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

  const excuteIntcode = (program, currentIndex) => {
    let i = currentIndex;

    while (i < program.length && program[i] !== "99") {
      if (program[i] === "4") {
        currentIndex = executeValidInst(program[i], program, i);
        return ({ program, shiffter, previousOutput, currentIndex, isTheEnd });
      }
      i = executeValidInst(program[i], program, i);
    }
    isTheEnd = true;
    currentIndex = i;
    return ({ program, shiffter, previousOutput, currentIndex, isTheEnd });
  };

  return (excuteIntcode(program, currentIndex));
};

const code =  Deno.readTextFileSync("amplifire_circuit.txt").split(/,/);

const combinations = permutations(["5", "6", "7", "8", "9"]);
const allResults = [];
for (const combination of combinations) {
  const programs = [[...code], [...code], [...code], [...code], [...code]];
  let previousOutput = "0";
  let isTheEnd = false;
  const indexes = [0, 0, 0, 0, 0];
  const inputIndex = [0, 0, 0, 0, 0];
  let result = {};

  while (!isTheEnd) {
    for (let i = 0; i < combination.length; i++) {
      const shiffter = combination[i];
      const program = programs[i];
      const currentIndex = indexes[i];
      result = amplification({
        program,
        shiffter,
        previousOutput,
        currentIndex,
        inputIndex: inputIndex[i],
        isTheEnd,
      });
      inputIndex[i] = 1;
      indexes.push(result.currentIndex);
      previousOutput = (result.previousOutput);
    }
    isTheEnd = result.isTheEnd;
    indexes.splice(0, 5);
  }
  allResults.push(previousOutput);
}

console.log(allResults.sort((a, b) => +b - +a)[0])
