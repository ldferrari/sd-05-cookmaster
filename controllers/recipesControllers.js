const services = require('../services/index');
const Errors = require('../services/Errors/index');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user.sub;
    const recipe = await services.recipes.createRecipe(name, ingredients, preparation, userId);
    return res.status(201).json({ recipe });
  } catch (err) {
    if (err instanceof Errors.InvalidEntries) {
      return res.status(400).json({ message: err.message });
    }
    if (err instanceof Errors.EmailAlreadyExists) {
      return res.status(409).json({ message: err.message });
    }
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Algo deu Ruim no createRecipe do Controller' });
  }
};

module.exports = {
  createRecipe,
};
