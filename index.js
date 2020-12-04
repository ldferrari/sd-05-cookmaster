// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// IMPORTATIONS
const app = express();

app.use(bodyParser.json());

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');
const { errorMiddleware } = require('./middlewares');

// ENDPOINTS

// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(errorMiddleware);

// PORT LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Yummy, here is ${PORT} port`));
