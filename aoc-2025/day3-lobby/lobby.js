// const banks =
//   "987654321111111\n811111111111119\n234234234234278\n818181911112111";

const banks = Deno.readTextFileSync("inputs.txt");

const batteryBanks = banks.split(/\n/);

const getPossibleJoltage = (totalJoltage, bank) => {
  let largestJoltage = 0;
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const joltage = parseInt(bank[i] + bank[j]);
      largestJoltage = joltage > largestJoltage ? joltage : largestJoltage;
    }
  }
  return totalJoltage + largestJoltage;
};

console.log(batteryBanks.reduce(getPossibleJoltage, 0));
