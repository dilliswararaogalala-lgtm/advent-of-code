const orbits = Deno.readTextFileSync("universal_orbit_map.txt");

const dbg = (x) => {
  console.log(x);
  return x
}
const getOrbits = (orbit, currentOrbit) => {
  orbit[currentOrbit[1]] = currentOrbit[0];
  return orbit;
}

const directOrbits = (orbits.split(/\n/).map(x => x.split(/\)/)).reduce(getOrbits, {}));
let count = 0;

for (let key in directOrbits) {
  while(directOrbits[key] !== undefined){
    count++;
    key = directOrbits[key];
  }
}

dbg(count);
