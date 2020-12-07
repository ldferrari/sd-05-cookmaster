// const multer = require('multer');
const service = require('../services/recipeServices');

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.userData;
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

const getAll = async (req, res) => {
  try {
    const recipes = await service.getAll();
    // const sales = await model.getAllSales();
    // console.log(sales);
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu ruim no getAll recipes' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(dadosBody);
    const goGetById = await service.getById(id);
    // console.log(login);
    if (goGetById.error) {
      if (goGetById.code === 'Not Found') {
        return res.status(404).json({ message: goGetById.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no getId' });
    }
    res.status(200).json(goGetById);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu bem ruim no getId' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: tokenId, role } = req.userData;

  // console.log(name, ingredients, preparation, id, role, tokenId);
  try {
    const updatedRecipe = await service.update(name, ingredients, preparation, id, role, tokenId);
    res.status(200).json(updatedRecipe); // não seria 204?
  } catch (err) {
    if (err.code === 'Not Found') {
      return res.status(440).json({ err: { code: err.code, message: err.message } });
    }
    if (err.code === 'Bad Request') {
      return res.status(400).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err.message);
    res.status(500).json({ message: 'Algo deu bem errado no update' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id: tokenId, role } = req.userData;
  try {
    await service.exclude(id, role, tokenId);
    res.status(204).end();
  } catch (err) {
    if (err.code === 'Not Found') {
      return res.status(440).json({ err: { code: err.code, message: err.message } });
    }
    if (err.code === 'Bad Request') {
      return res.status(400).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no exclude' });
  }
};

const upload = async (req, res) => {
  try {
    const { _id: tokenId, role } = req.userData;
    const { id } = req.params;

    const updateImg = await service.uploadImage(id, tokenId, role);

    if (updateImg.error) {
      if (updateImg.code === ('Not Found' || 'Bad Request')) {
        return res.status(404).json({ message: updateImg.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no img getId upload update' });
    }

    res.status(200).json(updateImg);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu bem ruim no upload' });
  }
};

module.exports = {
  // login,
  getAll,
  getById,
  create,
  update,
  remove,
  upload,
};
