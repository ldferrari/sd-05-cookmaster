const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users.controller');
const recipesController = require('./controllers/recipes.controller');

const {
  loginUser,
} = require('./services/users.service');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', userController);
app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginUser, (req, res) => {
  res.status(200).json({ token: req.data });
});

const errorMiddleware = (err, _res, req, _next) => {
  const { status, message } = err;
  req.status(status || 500).json({ message });
};

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('I´m on, baby'); });
