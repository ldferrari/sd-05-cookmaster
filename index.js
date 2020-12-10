const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

const PORT = 3000;
app.listen(PORT, () => console.log(`porta ${PORT} está on`));
