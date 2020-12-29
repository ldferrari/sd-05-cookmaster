const { RecipesServices } = require('../services');
const AuthMiddleware = require('../middlewares/AuthMiddlewares');

module.exports = {
  createRecipes: async (req, res, _next) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const token = await AuthMiddleware.tokenIsValid(authorization);
    const recipe = await RecipesServices.createRecipe(
      name,
      ingredients,
      preparation,
      token.userId,
    );
    return res.status(201).json({ recipe });
  },
  listAllRecipes: async (_req, res, _next) => {
    const result = await RecipesServices.listAllRecipes();
    console.log('list all');
    return res.status(200).json(result);
  },
  listRecipeById: async (req, res, _next) => {
    const { id } = req.params;
    const result = await RecipesServices.listRecipeById(id);
    return res.status(200).json(result);
  },
};
