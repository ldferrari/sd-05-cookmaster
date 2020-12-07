const path = require('path');
const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(parser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes.users);
app.use('/recipes', routes.recipes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`O PAI TÁ ON NA PORTA ${PORT}`);
});
