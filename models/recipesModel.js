// // const { ObjectId } = require('mongodb');
const connection = require('./connection');

const theCollection = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const saida = await connection().then((db) => db
    .collection(theCollection).insertOne({ name, ingredients, preparation, userId }));
  return saida.ops[0];
};

module.exports = {
  create,
};
