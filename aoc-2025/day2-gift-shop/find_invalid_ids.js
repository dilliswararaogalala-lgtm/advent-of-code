// const database =
//   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

const database = Deno.readTextFileSync('inputs.txt')
const IdRanges = database.split(/,/).map((x) => x.split(/-/));

const countInvalidIds = (total, [start, end]) => {
  const startOfRange = parseInt(start);
  const endOfRange = parseInt(end);

  const isEven = (x) => x % 2 === 0;

  for (let id = startOfRange; id <= endOfRange; id++) {
    const numberAsString = String(id);
    const length = numberAsString.length;

    if (isEven(length)) {
      const first_half = numberAsString.slice(0, length / 2);
      const second_half = numberAsString.slice(length / 2);
      total = first_half === second_half ? total + id : total;
    }
  }

  return total;
};

 
console.log(IdRanges.reduce(countInvalidIds, 0));
