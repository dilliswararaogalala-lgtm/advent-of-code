const orbits = Deno.readTextFileSync("universal_orbit_map.txt");

// const orbits =
//   "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN";

const dbg = (x) => {
  console.log(x);
  return x;
};

const getOrbits = (orbit, currentOrbit) => {
  orbit[currentOrbit[1]] = currentOrbit[0];
  return orbit;
};

const directOrbits = orbits
  .split(/\n/)
  .map((x) => x.split(/\)/))
  .reduce(getOrbits, {});

const getPath = (directOrbits, pointer) => {
  const path = [];
  while (directOrbits[pointer] !== undefined) {
    pointer = directOrbits[pointer];
    path.push(pointer);
  }
  return path;
};

const pathOfYou = dbg(getPath(directOrbits, "YOU"));
const pathOfSan = dbg(getPath(directOrbits, "SAN"));

const getTheCommonPath = (pathOfYou, pathOfSan) => {
  for(let i = 0; i < pathOfYou.length; i++){
    if(pathOfSan.includes(pathOfYou[i])){
      return [i, pathOfSan.indexOf(pathOfYou[i])];
    }
  }
}

//dbg(intersect(pathOfYou, pathOfSan));
const [p1,p2] = getTheCommonPath(pathOfYou, pathOfSan);
console.log(p1+p2);
