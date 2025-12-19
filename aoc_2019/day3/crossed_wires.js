const wiresDirection = Deno.readTextFileSync("crossed_wires.txt");

//const wiresDirection = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83"
const directions = wiresDirection.split(/\n/).map((x) => x.split(","));

const moveRight = (instruction, path, coordinates) => {
  let { x, y , steps} = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 0; i < moves; i++) {
    x += 1;
    steps += 1
    path[[x, y]] = steps ;
  }
  coordinates.x = x;
  coordinates.steps = steps;
  return path;
};

const moveLeft = (instruction, path, coordinates) => {
  let { x, y , steps} = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 0; i < moves; i++) {
    x -= 1;
    steps += 1
    path[[x, y]] = steps;
  }
  coordinates.x = x;
  coordinates.steps = steps
  return path;
};

const moveup = (instruction, path, coordinates) => {
  let { x, y, steps } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 0; i < moves; i++) {
    y += 1;
    steps += 1
    path[[x, y]] = steps;
  }
  coordinates.y = y;
  coordinates.steps = steps;
  return path;
};

const moveDown = (instruction, path, coordinates) => {
  let { x, y ,steps } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 0; i < moves; i++) {
    y -= 1;
    steps += 1
    path[[x, y]] = steps;
  }
  coordinates.y = y;
  coordinates.steps = steps;
  return path;
};

const instructions = {
  R: moveRight,
  L: moveLeft,
  U: moveup,
  D: moveDown,
};

const getWirePaths = (directions, coordinates) => {
  return directions.map((x) => {
    const { ...points } = coordinates;
    const extractPath = (path, instruction) => {
      return instructions[instruction.slice(0, 1)](
        instruction,
        path,
        points,
      );
    };
    return x.reduce(extractPath, {});
  });
};

const getIntersections = (wirePaths) => {
  const firstWirePath = Object.keys(wirePaths[0]);
  const secondWirePath = wirePaths[1];
  const getInterSectionPoints = (intersectionPoints, point) => {
    if (point in secondWirePath) {
      intersectionPoints.push(secondWirePath[point]);
    }
    return intersectionPoints;
  };
  return firstWirePath.reduce(getInterSectionPoints, []);
};

const calculateDistance = ([x, y]) => {
  return Math.abs(0 - x) + Math.abs(0 - y);
};

const wirePaths = getWirePaths(directions, { x: 0, y: 0, steps: 0 });
//console.log(Math.min(...getIntersections(wirePaths).map((x) => calculateDistance(x))));

const getIntersectionsAndSteps = (wirePaths) => {
  const firstWirePath = Object.keys(wirePaths[0]);
  const secondWirePath = wirePaths[1];
  const getInterSectionPoints = (intersectionPoints, point) => {
    if (point in secondWirePath) {
      intersectionPoints.push(wirePaths[0][point] + secondWirePath[point]);
    }
    return intersectionPoints;
  };
  return firstWirePath.reduce(getInterSectionPoints, []) 
}

console.log(Math.min(...getIntersectionsAndSteps(wirePaths)))
