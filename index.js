const express = require('express');
const bodyParser = require('body-parser');

const { usersController, loginController, recipesController } = require('./controllers/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/images', express.static('uploads'));

app.get('/', (_, res) => { res.send(); });

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

app.listen(port, () => console.log(`port: ${port}`));
