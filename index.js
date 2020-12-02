const express = require('express');

const users = require('./controllers/usersControllers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', users);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
