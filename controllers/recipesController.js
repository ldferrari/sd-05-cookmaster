const { Router } = require('express');
const jwt = require('jsonwebtoken');

const recipesRouter = Router();
// const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');

// 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post('/', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const secret = 'secret-stuff-here-what?';
    const payload = await jwt.verify(token, secret);
    console.log(payload.exp);
    // Returned:
    // { sub: '5fc81dfff74db93475229c5b',
    // userData:
    //  { _id: '5fc81dfff74db93475229c5b',
    //    name: 'Erick Jacquin',
    //    email: 'erickjacquin@gmail.com' },
    // iat: 1606950563,
    // exp: 1607036963 }
    // !! Problem: returns error if invalid, how to treat this?
    // await and this first?
    if (!token || !payload.exp*1000 > Date.now())
    // https://stackoverflow.com/questions/51292406/jwt-check-if-token-expired
    // still gives error 500
    // Solution: put payload in service and do try catch in it?
    // 02/12 night: will try this. 16 tests pass, last one for req3.
      return res.status(401).json({ message: 'jwt malformed' });
    const recipeCreated = await recipesServices.create(
      name,
      ingredients,
      preparation,
      token,
      payload
    );
    if (!recipeCreated) return res.status(400).json({ message: 'Recipe was not created' });
    return res.status(201).json(recipeCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ message: err.message });
    }
    // if (err.code === 'unauthorized') {
    //   return res.status(401).json({ message: err.message });
    // }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

module.exports = recipesRouter;
