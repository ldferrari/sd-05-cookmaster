const { RecipesServices } = require('../services');
const AuthMiddleware = require('../middlewares/AuthMiddlewares');

const createRecipes = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const token = await AuthMiddleware.tokenIsValid(authorization);
  const recipe = await RecipesServices.createRecipe(
    name,
    ingredients,
    preparation,
    token.userId,
  );
  res.status(201).json({ recipe });
};

module.exports = {
  createRecipes,
  listRecipe: async (req, res, _next) => {
    const result = await RecipesServices.listRecipe();
    res.status(200).json(result);
  },
};
