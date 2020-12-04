const recipesServices = require('../services/recipesServices');
const validateToken = require('../auth/validateToken');

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const tokenInfo = validateToken(authorization);
    const { id: userId } = tokenInfo;
    const { name, ingredients, preparation } = req.body;
    recipesServices.validateRecipe(name, ingredients, preparation);
    const saida = await recipesServices.create(name, ingredients, preparation, userId);
    res.status(201).json({ recipe: saida });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const saida = await recipesServices.getAllRecipes();
    res.status(200).json(saida);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Something wrong happenned' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await recipesServices.getById(id);
    res.status(200).json(saida);
  } catch (err) {
    // console.log('err', err);
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
  getAllRecipes,
  getById,
};
