require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.envKyle',
});
const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.routes');
const loginRoutes = require('./routes/login.routes');
const recipesRoutes = require('./routes/recipes.routes');
const imagesRoutes = require('./routes/Images.routes');

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/recipes', recipesRoutes);
app.use('/images', imagesRoutes);
app.get('/ping', (_req, res, _next) => { res.send('pong'); });

// não remova esse endpoint, e para o avaliador funcionar
// Ok Jean, não vou retirar esse endpoint
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Eis que estou a ${PORT} e bato.`);
});
