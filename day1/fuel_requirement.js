const modules = Deno.readTextFileSync("modules.txt").split(/\n/);

const dbg = (x) => {
  console.log(x);
  return x;
};

const fuelRequirement = (spaceCraft) => Math.floor(spaceCraft / 3) - 2;

const fuelForFuels = (mass) => {
  const newMass = fuelRequirement(mass);
  if (newMass <= 0) {
    return 0;
  }
  return newMass + fuelForFuels(newMass);
};

dbg(
  modules
    .map((x) => fuelRequirement(x))
    .reduce((totalFuel, currentFuel) => totalFuel + currentFuel, 0),
);

dbg(
  modules
    .map((x) => fuelForFuels(x))
    .reduce((totalFuel, currentFuel) => totalFuel + currentFuel, 0),
);
