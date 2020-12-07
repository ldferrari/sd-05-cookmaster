const services = require('../services');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  try {
    const newRecipe = await services.recipes.create(name, ingredients, preparation);
    res.status(201).json(newRecipe);
  } catch (err) {
    if (err.code === 'invalid_email') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  create,
};
