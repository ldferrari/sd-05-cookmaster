const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (
  name,
  ingredients,
  preparation,
  imageUrl,
  userId,
) => {
  const db = await connection();
  const result = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, imageUrl, userId })
    .then((answer) => ({
      recipe: {
        _id: answer.insertedId,
        name,
        ingredients,
        preparation,
        userId,
      },
    }));
  return result;
};

const getAllRecipes = async () => {
  const db = await connection();

  const result = await db.collection('recipes').find().toArray();

  return result;
};

const getOneRecipe = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getOneRecipe,
};
