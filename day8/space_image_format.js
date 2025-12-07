import { chunk } from "jsr:@std/collections";

const imageData = Deno.readTextFileSync("space_image_format.txt").split("");

const imageSize = 25 * 6;

const chunks = chunk(imageData, imageSize);


const occurencesOfAll = (frequencies, layer) => {
  const ocuureces = (frequencyTable, number) => {
    frequencyTable[number] = frequencyTable[number] || 0;
    frequencyTable[number] += 1;
    return frequencyTable;
  };

  frequencies.push(layer.reduce(ocuureces, {}));
  return frequencies;
};

const allFrequencies = chunks.reduce(occurencesOfAll, []);

const lowestZeroes = allFrequencies
  .filter((object) => object[0])
  .reduce((min, current) => {
    return current[0] < min[0] ? current : min;
  });

console.log(lowestZeroes[1] * lowestZeroes[2]);

