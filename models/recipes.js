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

module.exports = {
  create,
};
