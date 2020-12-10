const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userIdParam) =>
  connection('recipes')
    .then((user) => user.insertOne({ name, ingredients, preparation }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId: userIdParam,
    }));

const getAll = async () =>
  connection('recipes').then((collection) => collection.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('recipes').then((recipes) =>
    recipes.findOne({ _id: ObjectId(id) }));
};

const update = (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('recipes').then((recipes) =>
    recipes.updateOne(
      { _id: ObjectId(id) },
      { $set: { id, name, ingredients, preparation } },
    ));
};

const exclude = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('recipes').then((recipes) =>
    recipes.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
