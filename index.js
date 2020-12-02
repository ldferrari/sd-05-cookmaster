const express = require('express');
const parser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(parser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`O PAI TÁ ON NA PORTA ${PORT}`);
});
