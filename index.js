const express = require('express');
const bodyParser = require('body-parser');
const { users, login } = require('./controllers');

const { handleErrors } = require('./middlewares');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);

app.use('/login', login);

const PORT = process.env.PORT || 3000;

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`zzzzzzzz... tamo on na porta ${PORT}`);
});
