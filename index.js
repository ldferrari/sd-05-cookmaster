const path = require('path');
const express = require('express');
const { usersController, loginController, recipesController } = require('./controller');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
