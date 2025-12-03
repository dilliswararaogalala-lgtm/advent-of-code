const wiresDirection = Deno.readTextFileSync("crossed_wires.txt");

const directions = wiresDirection.split(/\n/).map((x) => x.split(","));

const moveRight = (instruction, path, coordinates) => {
  let { x, y } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 1; i <= moves; i++) {
    x += 1;
    path[[x, y]] = [x, y];
  }
  coordinates.x = x;
  return path;
};

const moveLeft = (instruction, path, coordinates) => {
  let { x, y } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 1; i <= moves; i++) {
    x -= 1;
    path[[x, y]] = [x, y];
  }
  coordinates.x = x;
  return path;
};

const moveup = (instruction, path, coordinates) => {
  let { x, y } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 1; i <= moves; i++) {
    y += 1;
    path[[x, y]] = [x, y];
  }
  coordinates.y = y;
  return path;
};

const moveDown = (instruction, path, coordinates) => {
  let { x, y } = coordinates;
  const moves = parseInt(instruction.slice(1));
  for (let i = 1; i <= moves; i++) {
    y -= 1;
    path[[x, y]] = [x, y];
  }
  coordinates.y = y;
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

const wirePaths = getWirePaths(directions, { x: 0, y: 0 });
console.log(Math.min(...getIntersections(wirePaths).map((x) => calculateDistance(x))));
