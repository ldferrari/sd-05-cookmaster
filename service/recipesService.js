const {
  insertRecipe,
  getAllRecipes,
  getOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  updateWithImage,
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

const editOneRecipeService = async (
  name,
  ingredients,
  preparation,
  user,
  recipeId,
) => {
  const recipe = await getOneRecipe(recipeId);
  if (recipe === null) {
    return { message: 'Invalid entries. Try again.' };
  }
  const { _id: currentUserId } = user;
  const result = await updateOneRecipe(
    name,
    ingredients,
    preparation,
    recipeId,
    currentUserId,
  );
  return result;
};

const deleteOneRecipeService = (id) => deleteOneRecipe(id);

const updateWithImageService = async (id) => {
  const recipe = await getOneRecipe(id);

  if (recipe === null) {
    return { message: 'Invalid entries. Try again.' };
  }

  const result = await updateWithImage(id);
  return result;
};

module.exports = {
  newRecipeService,
  getAllRecipesService,
  getOneRecipeService,
  editOneRecipeService,
  deleteOneRecipeService,
  updateWithImageService,
};
