const express = require('express');
const errorMid = require('./src/middlewares/error');
const usersCont = require('./src/controlers/usersCont');

const app = express();

app.use(express.json());

app.use('/users', usersCont);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMid);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MonsterChef na porta ${PORT}`);
});
