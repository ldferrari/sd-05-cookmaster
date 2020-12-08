const services = require('../services');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  try {
    const newRecipe = await services.recipes.create(name, ingredients, preparation);
    res.status(201).json(newRecipe);
  } catch (err) {
    if (err.code === 'invalid_entry') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const showAll = await services.recipes.getAll();
    res.status(200).json(showAll);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getRecipeById = await services.recipes.getById(id);
    res.status(200).json(getRecipeById);
  } catch (err) {
    if (err.code === 'invalid_id') {
      return res.status(404).json({ message: err.message });
    }
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  try {
    const updatedRecipe = await services.recipes.updateById(
      id,
      name,
      ingredients,
      preparation,
      userId,
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const removeById = async (req, res) => {
  const { id } = req.params;
  try {
    const removedRecipe = await services.recipes.removeById(id);
    res.status(204).json(removedRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  removeById,
  updateById,
};
