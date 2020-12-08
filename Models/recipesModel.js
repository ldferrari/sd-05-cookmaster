const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const create = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

  const getAll = async () =>
    getCollection('recipes')
      .then((recipe) => recipe.find().toArray());

  const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return getCollection('recipes')
      .then((recipe) => recipe.findOne({_id: ObjectId(id)}));
  };
    
  
module.exports = {
  create,
  getAll,
  getById,
};
