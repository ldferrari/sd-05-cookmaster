const express = require('express');
const bodyparser = require('body-parser');
const { registerControler } = require('./controllers/index');

const port = 3000;
const app = express();

app.use(bodyparser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(registerControler);

app.listen(port, () => {
  console.log('estamos online novamiente!');
});
