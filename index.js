const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const usersController = require('./Controllers/usersController');

const loginController = require('./Controllers/loginController');

const recipesController = require('./Controllers/recipesController');

// const authMiddleware = require('./Middlewares/auth');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ------------------------------------

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

app.use('/images', express.static(path.join(__dirname, '.', 'uploads')));
// app.use('/images', express.static(path.join(__dirname, 'jacquinho.jpg')));
// jacquinho.jpg

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});
