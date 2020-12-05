const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/inputValidation');
const recipesServices = require('../services/recipesServices');

const recipes = Router();

recipes.post(
  '/',
  validate(
    Joi.object({
      name: Joi.string().required().not().empty(),
      ingredients: Joi.string().required().not().empty(),
      preparation: Joi.string().required().not().empty(),
    }).messages({
      'any.required': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
    }),
    400,
  ),
  auth,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;
    const createRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);
    res.status(201).json(createRecipe);
  }),
);

recipes.get(
  '/',
  rescue(async (req, res) => {
    const allRecipes = await recipesServices.listRecipes();
    res.status(200).json(allRecipes);
  }),
);

recipes.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await recipesServices.listRecipeById(id);

    if (recipe.error) {
      res.status(recipe.statusCode).json({ message: recipe.message });
    }

    res.status(200).json(recipe);
  }),
);

recipes.put(
  '/:id',
  auth,
  rescue(async (req, res) => {
    const { id: recipeId } = req.params;
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;

    const updatedRecipe = await recipesServices.updateRecipe(
      name,
      ingredients,
      preparation,
      recipeId,
      userId,
    );

    res.status(200).json(updatedRecipe);
  }),
);

recipes.delete(
  '/:id',
  auth,
  rescue(async (req, res) => {
    const { id: recipeId } = req.params;
    const deletedRecipe = await recipesServices.deleteRecipe(recipeId);
    res.status(204).json(deletedRecipe);
  }),
);

module.exports = recipes;
