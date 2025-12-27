// const banks =
//   "987654321111111\n811111111111119\n234234234234278\n818181911112111";

const banks = Deno.readTextFileSync("inputs.txt");

const batteryBanks = banks.split(/\n/);

const getPossibleJoltage = (totalJoltage, bank) => {

  const joltages = bank.split('');

  const getLargestJoltage = (largest, charge, index, joltages) => {
    for(let i = index + 1; i < joltages.length; i++){
      const joltage = parseInt(charge + joltages[i]);
      largest = largest < joltage ? joltage : largest;
    }

    return largest;
  }

  const largestJoltage = joltages.reduce(getLargestJoltage, 0)
  return totalJoltage + largestJoltage;
};

console.log(batteryBanks.reduce(getPossibleJoltage, 0));
