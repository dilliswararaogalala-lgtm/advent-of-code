// const grid =
//   "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.";

const grid = Deno.readTextFileSync('inputs.txt');

const rollsOfPapers = grid.split(/\n/).map((x) => x.split(""));

const offsets = {
  "top": [-1, 0],
  "left": [0, -1],
  "right": [0, 1],
  "bottom": [1, 0],
  "top-left": [-1, -1],
  "top-right": [-1, 1],
  "bottom-left": [1, -1],
  "bottom-right": [1, 1],
};

const getTotalAsscebileRolls = (total, _, i, rollsOfPapers) => {

  const countAsscebileRolls = (total, currentPosition, j) => {
    if(currentPosition === '.') return total;

    let count = 0;
    for (const position in offsets) {
      const x = i + offsets[position][0];
      const y = j + offsets[position][1];
      if (
        x >= 0 && y >= 0 && x < rollsOfPapers.length &&
        y < rollsOfPapers[i].length
      ) {
        count = rollsOfPapers[x][y] === "@" ? count + 1 : count;
      }
    }

    return count < 4 ? total + 1 : total;
  };
  
  return rollsOfPapers[i].reduce(countAsscebileRolls, total);
};

console.log(rollsOfPapers.reduce(getTotalAsscebileRolls, 0));
