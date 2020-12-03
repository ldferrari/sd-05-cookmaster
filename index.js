const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usersController = require('./controllers/usersController');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);

app.listen(PORT, () => {
  console.log(`Estou monitorando a porta ${PORT}`);
});
