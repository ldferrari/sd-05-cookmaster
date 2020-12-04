const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes').then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));
  // console.log(newUser);
  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAll = async () =>
  getCollection('recipes').then((recipes) => recipes.find().toArray());

const getById = async (id) => getCollection('recipes')
  .then((recipes) => recipes.findOne(ObjectId(id)));

const update = async (name, ingredients, preparation, id) => { // userID
  const recipe = await getCollection('recipes')
    .then((recipes) => recipes.updateOne(
      { _id: ObjectId(id)}, // , 'recipes._id': Id
      { $set: { 
        'recipes[0].name': name,
        'recipes[0].ingredients': ingredients,
        'recipes[0].preparation': preparation,
        } },
    ));
  // console.log(recipe);
  return (name, ingredients, preparation, id);
};

// const excludeSales = async (id) => {
//   const deleted = await getCollection('sales')
//     .then((db) => db.deleteOne({ _id: ObjectId(id) }));
//   // console.log(deleted);
//   return deleted;
// };

module.exports = {
  getAll,
  getById,
  // getUserByEmail,
  create,
  update,
  // excludeSales,
};
