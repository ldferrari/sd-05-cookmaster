require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routersUser = require('./controller/userController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routersUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Docking on port ${PORT}`);
});
