const modules = Deno.readTextFileSync("modules.txt").split(/\n/);

const fuelRequirement = (spaceCraft) => Math.floor(spaceCraft / 3) - 2;

console.log(
  modules
    .map((x) => fuelRequirement(x))
    .reduce((totalFuel, currentFuel) => totalFuel + currentFuel),
);
