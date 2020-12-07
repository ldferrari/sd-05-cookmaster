const getConnection = require('./connection');

/*
formato do dos campos a ser salvo na tabela de receitas:

{
  "name" : "Receita do Jacquin",
  "ingredients" : "Frango",
  "preparation" : "10 minutos no forno"
}

formato do retorno do banco apos a requisição:

{
  "_id" : ObjectId("5f46919477df66035f61a356"),
  "name" : "string",
  "ingredients" : "string",
  "preparation" : "string",
  "userId" : ObjectId("5f46914677df66035f61a355")
}

*/
//  [ HONESTIDADE ACADÊMICA ] Recebi ajuda do Felipe Vieira,
// para identificar um erro de validação no github
const createRecipe = (recipe) => getConnection('recipes')
  .then((response) => response.insertOne(recipe))
  .then((results) => (results.ops[0]));

const getAllRecipes = () => getConnection('recipes')
  .then((results) => results.find({}).toArray());

module.exports = {
  getAllRecipes,
  createRecipe,
};
