const express = require('express');

const parser = require('body-parser');

const path = require('path');

const routes = require('./routes');

const app = express();

app.use(parser.json());
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', routes.users);

app.use('/recipes', routes.recipes);

app.use('/', routes.login);

app.listen(PORT, () => {
  console.log(`knocking on ${PORT}'s door`);
});
