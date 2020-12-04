const express = require('express');
const errorMid = require('./src/middlewares/error');
const usersCont = require('./src/controlers/usersCont');
const loginCont = require('./src/controlers/loginCont');
const recipeCont = require('./src/controlers/recipeCont');

const app = express();

app.use(express.json());

app.use('/users', usersCont);
app.use('/login', loginCont);
app.use('/recipes', recipeCont);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMid);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MonsterChef na porta ${PORT}`);
});
