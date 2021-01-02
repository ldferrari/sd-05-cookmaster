const express = require('express');

const users = require('./controllers/usersControllers');
const login = require('./controllers/loginController');
const recipes = require('./controllers/recipeController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
