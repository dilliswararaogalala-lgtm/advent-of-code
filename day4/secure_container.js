const input = "123789";

const inputInArray = input.split("");

const dbg = (x) => {
  console.log(x);
  return x;
}

const checkPassword = (input) => {
  for (let index = 1; index < input.length; index++) {
    if (input[index - 1] === input[index]) return true;
  }
  return false;
};

dbg(checkPassword(input));
