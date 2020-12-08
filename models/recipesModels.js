const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = (name, ingredients, preparation) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation }))
    .then((res) => ({ recipe: { _id: res.insertedId, name, ingredients, preparation } }));

const findByName = (name) => getCollection('recipes').then((recipes) => recipes.findOne({ name }));

const getAll = () => getCollection('recipes').then((recipes) => recipes.find().toArray());

// prettier-ignore
const getById = (id) =>
  (!ObjectId.isValid(id)
    ? null
    : getCollection('recipes').then((recipes) => recipes.findOne(ObjectId(id))));

// prettier-ignore
const updateById = (id, name, ingredients, preparation, userId) =>
  (!ObjectId.isValid(id)
    ? null
    : getCollection('recipes')
      .then((recipes) =>
        recipes.updateOne(
          { _id: ObjectId(id) },
          { $set: { name, ingredients, preparation, userId } },
        ))
      .then((_res) => ({
        _id: ObjectId(id),
        name,
        ingredients,
        preparation,
        userId,
      })));

const removeById = (id) =>
  getCollection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  removeById,
  updateById,
};
