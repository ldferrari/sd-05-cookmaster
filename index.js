const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({
  storage,
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.create);

app.post('/login', userController.login);

app.post('/recipes', authMiddleware, recipeController.create);

app.get('/recipes', recipeController.getAll);

app.get('/recipes/:id', recipeController.getById);

app.put('/recipes/:id/image/', authMiddleware, upload.single('image'), recipeController.upload);

app.put('/recipes/:id', authMiddleware, recipeController.update);

app.delete('/recipes/:id', authMiddleware, recipeController.remove);

app.use('/images', express.static(path.join(__dirname, 'uploads'))); // ?

// app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`o pai tá ON na: ${PORT}`);
});
