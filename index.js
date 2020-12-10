const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const usersController = require('./controllers/usersController');

app.use('/users', usersController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
