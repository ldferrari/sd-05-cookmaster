const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Escutando porta ${PORT}, Xablau`);
});
