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

module.exports = {
  create,
  getAll,
};
