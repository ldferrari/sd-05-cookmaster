const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAll = async () => connection('recipes').then((recipes) => recipes.find({}).toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('recipes').then((recipes) => {
    console.log('entrou no getbyid');
    return recipes.findOne({ _id: ObjectId(id) });
  });
};

const updateRecipe = async (recipeID, name, ingredients, preparation, userID) => {
  if (!ObjectId.isValid(recipeID)) return;
  connection('recipes').then((recipes) =>
    recipes.updateOne({
      _id: ObjectId(recipeID) }, { $set: { name, ingredients, preparation, userID },
    }));
  const updatedRecipe = { _id: recipeID, name, ingredients, preparation, userID };
  console.log(updatedRecipe);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));
  }
};

const updateImage = async (id, userID) => {
  const recipe = await getById(id);
  console.log(recipe);
  console.log(userID);
  if (recipe.userId !== userID) {
    console.log('entrou no if do userID');
    return null;
  }
  const path = `localhost:3000/images/${id}.jpeg`;
  connection('recipes')
    .then((recipes) => recipes.updateOne({ _id: ObjectId(id) }, { $set: { image: path } }));
  return getById(id);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  updateImage,
};
