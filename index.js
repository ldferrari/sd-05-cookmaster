const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');

const errorHandling = require('./middlewares/errorHandling');
// const validation = require('./controllers/validation');
const recipeRouter = require('./controllers/recipeController');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '/uploads')), (req, res) => {
  res.status(200).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipeRouter);

const PORT = 3000;

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Body parça on na porta: ${PORT}`);
});
