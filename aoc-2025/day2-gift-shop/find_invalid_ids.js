// const database =
//   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

const database = Deno.readTextFileSync("inputs.txt");

const IdRanges = database.split(/,/).map((x) => x.split(/-/));

const countInvalidIds = (total, [start, end]) => {
  const startOfRange = parseInt(start);
  const endOfRange = parseInt(end);

  for (let id = startOfRange; id <= endOfRange; id++) {
    const numberAsString = String(id);
    if (/^(\d+)\1+$/.test(numberAsString)) total += id;
  }

  return total;
};

console.log(IdRanges.reduce(countInvalidIds, 0));
