//const database = "3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32";

const database = Deno.readTextFileSync('inputs.txt')
const ingredients = database.split(/\n\n/);

const freshIngredientId = ingredients[0].split(/\n/);

const ingredientIds = ingredients[1].split(/\n/).map(x => parseInt(x))

const countFreshIngredients = (count, currentIngredient) => {
  const isFreshIngredient = (freshIdRange) => {
    const range = freshIdRange.split(/-/);
    const startingId = parseInt(range[0]);
    const endingId = parseInt(range[1]);
    return currentIngredient >= startingId && currentIngredient <= endingId;
  }
  return freshIngredientId.some(isFreshIngredient) ? count + 1 : count;
}

const noOfFreshIngredients = ingredientIds.reduce(countFreshIngredients, 0)
console.log(noOfFreshIngredients);
