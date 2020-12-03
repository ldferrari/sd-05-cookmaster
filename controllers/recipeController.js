const service = require('../services/recipeServices');

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.userId;
    // const token = req.headers.authorization;

    console.log(userId);
    const createdRecipe = await service.create(name, ingredients, preparation, userId);
    // console.log(createdUser);
    if (createdRecipe.error) {
      if (createdRecipe.code === 'Bad Request') {
        return res.status(400).json({ message: createdRecipe.message });
      }
      if (createdRecipe.code === 'Unauthorized') {
        return res.status(401).json({ message: createdRecipe.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no create Recipe' });
    }
    res.status(201).json({ recipe: createdRecipe });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu bem ruim no create recipe' });  
  }
};

module.exports = {
  // login,
  // getAll,
  // getById,
  create,
  // update,
  // remove,
};
