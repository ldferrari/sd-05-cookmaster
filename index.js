const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');
const controllerUsers = require('./controllers/users');
const controllerRecipes = require('./controllers/recipes');

const app = express();
app.use(bodyParse.json());

app.use(express.static(path.join(__dirname, '/uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', controllerUsers);

app.use('/recipes', controllerRecipes);

app.listen(3000, () => console.log('Lisen on 3000 ....'));
