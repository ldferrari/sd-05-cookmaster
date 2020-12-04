const recipesServices = require('../services/recipesServices');

const create = async (req, res) => {
  try {
    const { id: userId } = req.validatedTokenInfo;
    const { name, ingredients, preparation } = req.body;
    recipesServices.validateRecipe(name, ingredients, preparation);
    const saida = await recipesServices.create(name, ingredients, preparation, userId);
    return res.status(201).json({ recipe: saida });
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const saida = await recipesServices.getAllRecipes();
    return res.status(200).json(saida);
  } catch (err) {
    return res.status(500).json({ message: 'Something wrong happenned' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await recipesServices.getById(id);
    return res.status(200).json(saida);
  } catch (err) {
    // console.log('err', err);
    return res.status(err.code).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { id: userId, role } = req.validatedTokenInfo;
    const receita = await recipesServices.getById(id);
    const { userId: userIdFromRecipe } = receita;

    if (userIdFromRecipe === userId || role === 'admin') {
      const saida = await recipesServices.update(id, name, ingredients, preparation, userId);
      return res.status(200).json(saida);
    }
  } catch (err) {
    // console.log('o err eh', err);
    return res.status(500).json({ message: 'Something REALLY wrong happenned' });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const receita = await recipesServices.getById(id);
    const { userId: userIdFromRecipe } = receita;
    const { id: userId, role } = req.validatedTokenInfo;
    if (userIdFromRecipe === userId || role === 'admin') {
      await recipesServices.exclude(id);
      return res.status(204).send();
    }
  } catch (err) {
    return res.status(500).json({ message: 'Ocorreu um erro no Bd' });
  }
};

const updateWithImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.savePath;
    const receita = await recipesServices.getById(id);
    const { name, ingredients, preparation, userId } = receita;
    const { role } = req.validatedTokenInfo;
    if (userId === req.validatedTokenInfo.id || role === 'admin') {
      const saida = await recipesServices
        .updateWithImage(id, name, ingredients, preparation, req.validatedTokenInfo.id, image);
      return res.status(200).json(saida);
    }
  } catch (err) {
    // console.log('err', err);
    return res.status(500).send({ message: 'Ocorreu um erro no Bd' });
  }
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  update,
  exclude,
  updateWithImage,
};

//  https://stackoverflow.com/questions/2690065/return-in-catch-block
