const express = require('express');
const path = require('path');

const users = require('./controllers/usersControllers');
const login = require('./controllers/loginController');
const recipes = require('./controllers/recipeController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
// Referência Paulo Dandréa
app.use('/images', express.static(path.join(__dirname, '/uploads')), (req, res) => {
  res.status(200).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
