// const grid =
//   "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.";

const grid = Deno.readTextFileSync("inputs.txt");

const paperRolls = grid.split(/\n/).map((x) => x.split(""));

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

const getTotalAsscessibleRolls = (total, _, i, rollsOfPapers) => {
  const countAsscebileRolls = (total, currentPosition, j) => {
    if (currentPosition === ".") return total;

    let count = 0;
    for (const position in offsets) {
      const x = i + offsets[position][0];
      const y = j + offsets[position][1];
      if (
        x >= 0 && y >= 0 && x < rollsOfPapers.length &&
        y < rollsOfPapers[i].length
      ) {
        count = rollsOfPapers[x][y] === "@" || rollsOfPapers[x][y] === "x"
          ? count + 1
          : count;
      }
    }
    if (count < 4) {
      total += 1;
      rollsOfPapers[i][j] = "x";
    }
    return total;
  };

  return rollsOfPapers[i].reduce(countAsscebileRolls, total);
};


const countOfRolls = paperRolls.reduce(getTotalAsscessibleRolls, 0);
const flags = { countOfRolls, total: countOfRolls };

const getAllPossibleRolls = ({ countOfRolls, total }, paperRolls) => {
  while (countOfRolls > 0) {
    paperRolls = paperRolls
      .map((x) => x.join("").replaceAll("x", "."))
      .map(
        (x) => x.split(""),
      );
    countOfRolls = paperRolls.reduce(getTotalAsscessibleRolls, 0);
    total += countOfRolls;
  }

  return total;
};

console.log(getAllPossibleRolls(flags, [...paperRolls]));