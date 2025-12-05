const orbits = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L";

const directOrbits = orbits
  .split(/\n/)
  .map((x) => x.split(/\)/));

const uniqueOrbits = directOrbits
  .flatMap((x) => x)
  .reduce((uniqueOrbits, orbit) => {
    if (!uniqueOrbits.includes(orbit)) uniqueOrbits.push(orbit);
    return uniqueOrbits;
  }, [])
  .sort((a, b) => a - b);

console.log(uniqueOrbits);
