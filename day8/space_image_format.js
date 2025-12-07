import { chunk } from "jsr:@std/collections";

const imageData = Deno.readTextFileSync("space_image_format.txt").split("");
//const imageData = "0222112222120000".split("");

const imageSize = 25 * 6;

const chunks = chunk(imageData, imageSize);

const images = ["◼️", "◻️"];

let i = 0;

const result = [];

for (let j = 0; j < chunks[i].length; j++) {
  while (chunks[i][j] === "2") {
    i++;
  }
  result.push(chunks[i][j]);
  i = 0;
}

console.log(
  chunk(result, 25)
    .map((x) =>
      x
        .join("")
        .replaceAll("0", images[0])
        .replaceAll("1", images[1])
    ).join("\n"),
);

// const occurencesOfAll = (frequencies, layer) => {
//   const ocuureces = (frequencyTable, number) => {
//     frequencyTable[number] = frequencyTable[number] || 0;
//     frequencyTable[number] += 1;
//     return frequencyTable;
//   };

//   frequencies.push(layer.reduce(ocuureces, {}));
//   return frequencies;
// };

// const allFrequencies = chunks.reduce(occurencesOfAll, []);

// const lowestZeroes = allFrequencies
//   .filter((object) => object[0])
//   .reduce((min, current) => {
//     return current[0] < min[0] ? current : min;
//   });

// console.log(lowestZeroes[1] * lowestZeroes[2]);
