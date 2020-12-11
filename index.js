const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const usersController = require('./controllers/usersController');

const loginController = require('./controllers/loginController');

const recipesController = require('./controllers/recipesController');

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
