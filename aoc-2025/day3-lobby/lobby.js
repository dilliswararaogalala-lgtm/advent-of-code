// const banks =
//   "987654321111111\n811111111111119\n234234234234278\n818181911112111";

const banks = Deno.readTextFileSync("inputs.txt");

const batteries = banks.split(/\n/);

function getMaxJoltage(total, batteryBank) {
  const result = [];
  const batteries = batteryBank.split("").map(Number);
  const totalBatteries = batteries.length;

  let skipBudget = totalBatteries - 12;

  for (const currentDigit of batteries) {
    while (
      skipBudget > 0 && result.length > 0 &&
      result[result.length - 1] < currentDigit
    ) {
      result.pop();
      skipBudget--;
    }

    result.push(currentDigit);
  }

  return total + parseInt(result.slice(0, 12).join(""));
}

console.log(batteries.reduce(getMaxJoltage, 0));
