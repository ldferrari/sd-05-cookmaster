const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const auth = require('./auth/validateToken');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);

app.post('/login', usersController.login);

app.post('/recipes', auth.verifyJWT, recipesController.create);

app.get('/recipes', recipesController.getAllRecipes);

app.get('/recipes/:id', recipesController.getById);

app.put('/recipes/:id', auth.verifyJWT, recipesController.update);

app.delete('/recipes/:id', auth.verifyJWT, recipesController.exclude);

app.listen(PORT, () => {
  console.log(`Estou monitorando a porta ${PORT}`);
});
