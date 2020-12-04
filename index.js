const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const auth = require('./auth/validateToken');
const multer = require('./middlewares/multer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);

app.post('/login', usersController.login);

app.post('/recipes', auth.verifyJWT, recipesController.create);

app.get('/recipes', recipesController.getAllRecipes);

app.get('/recipes/:id', recipesController.getById);

app.put('/recipes/:id', auth.verifyJWT, recipesController.update);

app.delete('/recipes/:id', auth.verifyJWT, recipesController.exclude);

app.put('/recipes/:id/image/', auth.verifyJWT, multer.upload.single('image'), recipesController.updateWithImage);

app.listen(PORT, () => {
  console.log(`Estou monitorando a porta ${PORT}`);
});
