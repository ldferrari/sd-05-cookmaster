const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const recipeController = require('./controllers/recipeController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Endpoints
app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);

// Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
