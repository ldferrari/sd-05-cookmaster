const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const errorMiddlewares = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);

app.use(errorMiddlewares);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
