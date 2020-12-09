const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const usersController = require('./controller/usersController');
const loginController = require('./controller/loginController');
const recipesController = require('./controller/recipesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '/uploads')));

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ouvindo a porta ${PORT}`);
});
