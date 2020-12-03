const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);

app.post('/login', usersController.login);

app.post('/recipes', recipesController.create);

app.listen(PORT, () => {
  console.log(`Estou monitorando a porta ${PORT}`);
});
