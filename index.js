const express = require('express');
const usersControllers = require('./controller').usersController;

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersControllers);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
