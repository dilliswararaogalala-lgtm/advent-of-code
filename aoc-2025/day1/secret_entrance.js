//const puzzleInput = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";
const puzzleInput = Deno.readTextFileSync('input.txt');

const dbg = (x) => {
  console.log(x);
  return x;
};

const rotateLeft = (noOfRotations, pointer) => {
  return Array.from(
    { length: noOfRotations },
    () => pointer = pointer ? pointer - 1 : 99,
  );
};

const rotateRight = (noOfRotations, pointer) => {
  return Array.from(
    { length: noOfRotations },
    () => pointer = pointer === 99 ? 0 : pointer + 1,
  );
};

const perfromRotation = ({ pointer, countOfZeroes }, { direction, moves }) => {
  const rotation = {
    L: rotateLeft,
    R: rotateRight,
  };

  const eachSteps = rotation[direction](moves, pointer);

  const countZeroes = (count, step) => step === 0 ? count + 1 : count ;

  pointer = eachSteps[moves - 1];
  countOfZeroes = eachSteps.reduce(countZeroes, countOfZeroes);

  return { pointer, countOfZeroes };
};

const parseDirection = (instruction) => instruction.slice(0, 1);

const parseMoves = (instruction) => parseInt(instruction.slice(1));

const parseDirectionAndMoves = (input) => {
  const direction = parseDirection(input);
  const moves = parseMoves(input);
  return { direction, moves };
};

const parseInputs = (sequenceOfRotations) => {
  return sequenceOfRotations.map(parseDirectionAndMoves);
};

const unlockTheLock = (pointer, rotationsSequences) => {
  const finalPassword =  rotationsSequences.reduce(perfromRotation, {
    pointer,
    countOfZeroes: 0,
  });
  return finalPassword.countOfZeroes;
};

const parsedInputs = parseInputs(puzzleInput.split(/\n/));

dbg(unlockTheLock(50, parsedInputs));
