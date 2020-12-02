// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');
require('dotenv').config();

// IMPORTATIONS
const app = express();

app.use(bodyParser.json());

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
// const recipesController = require('./controllers/recipesController');

// ENDPOINTS

// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/login', loginController);

// Usar middleware static para permitir acesso a imagens via a API
// const path = require('path');
// ...
// /images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads')
// é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
// app.use('/images', express.static(path.join(__dirname, 'uploads')));
// ...

// PORT LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Yummy, here is ${PORT} port`));
