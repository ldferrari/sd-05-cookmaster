const { RecipesServices } = require('../services');
const AuthMiddleware = require('../middlewares/AuthMiddlewares');

module.exports = {
  createRecipes: async (req, res, _next) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const token = await AuthMiddleware.tokenIsValid(authorization);
    const { _id: userId } = token;
    const recipe = await RecipesServices.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    return res.status(201).json({ recipe });
  },
  listAllRecipes: async (_req, res, _next) => {
    const result = await RecipesServices.listAllRecipes();
    return res.status(200).json(result);
  },
  listRecipeById: async (req, res, _next) => {
    const { id } = req.params;
    const result = await RecipesServices.listRecipeById(id);
    return res.status(200).json(result);
  },
  updateRecipe: async (req, res, _next) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const updatedRecipe = await RecipesServices.updateRecipe(id, name, ingredients, preparation);
    return res.status(200).send(updatedRecipe);
  },
  removeRecipe: async (req, res, _next) => {
    const { id } = req.params;
    await RecipesServices.removeRecipe(id);
    return res.status(204).send();
  },
  addImage: async (req, res, _next) => {
    const { id } = req.params;
    const newRecipe = await RecipesServices.addImage(id);
    return res.status(200).send(newRecipe);
  },
};
