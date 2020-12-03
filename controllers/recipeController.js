const express = require('express');
const rescue = require('express-rescue');
const { addRecipeServ } = require('../services/recipeService');

const recipeRouter = express.Router();

recipeRouter.post(
  '/',
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    // console.log('recipe controler', name);
    const recipe = await addRecipeServ(name, ingredients, preparation);

    console.log('====================================');
    console.log(recipe);
    console.log('====================================');

    // recipe.userId = req.user
    // const user = req.user;
    // console.log(user);

    recipe.userId = req.user._id;

    // console.log({ recipe: { ...recipe, userId: user._id } });

    console.log({recipe});

    return res.status(201).json({ recipe });

    // console.log(recipeCreated);
  }),
);

module.exports = recipeRouter;
