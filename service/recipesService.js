const {
  insertRecipe,
  getAllRecipes,
  getOneRecipe,
} = require('../model').recipes;

const newRecipeService = async (
  name,
  ingredients,
  preparation,
  imageUrl,
  authorId,
) => {
  if (!name || !ingredients || !preparation) {
    return { message: 'Invalid entries. Try again.' };
  }
  const newRecipeInserted = await insertRecipe(
    name,
    ingredients,
    preparation,
    imageUrl,
    authorId,
  );
  return newRecipeInserted;
};

const getAllRecipesService = () => getAllRecipes();

const getOneRecipeService = async (id) => {
  const result = await getOneRecipe(id);

  if (result === null) {
    return { message: 'recipe not found' };
  }

  return result;
};

module.exports = {
  newRecipeService,
  getAllRecipesService,
  getOneRecipeService,
};
