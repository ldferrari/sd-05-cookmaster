const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { users, login, recipes } = require('./controllers');

const { handleErrors } = require('./middlewares');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', users);

app.use('/login', login);

app.use('/recipes', recipes);

const PORT = process.env.PORT || 3000;

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`zzzzzzzz... tamo on na porta ${PORT}`);
});
