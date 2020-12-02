const bodyParser = require('body-parser');
const express = require('express');
const userRouter = require('./controllers/userController');
const errorHandling = require('./middlewares/errorHandling');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);

const PORT = 3000;

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Body parça on na porta: ${PORT}`);
});
