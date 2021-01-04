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

const updateOneRecipe = async (
  name,
  ingredients,
  preparation,
  recipeId,
  userId,
) => {
  const db = await connection();
  const result = db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
    )
    .then((answer) => ({
      _id: answer.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

  return result;
};

const deleteOneRecipe = async (id) => {
  const db = await connection();
  const result = await db
    .collection('recipes')
    .deleteOne({ _id: ObjectId(id) });

  return result;
};

const updateWithImage = async (id) => {
  const db = await connection();
  const result = db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { image: `localhost:3000/images/${id}.jpeg` } },
    )
    .then(() => ({
      image: `localhost:3000/images/${id}.jpeg`,
    }));

  return result;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  updateWithImage,
};
