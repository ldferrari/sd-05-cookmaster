const express = require('express');
// const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
// const salesController = require('./controllers/salesController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.create);

//app.post('/login', userController.create);

// app.get('/products', productController.getAll);

// app.get('/products/:id', productController.getById);

// app.put('/products/:id', productController.update);

// app.delete('/products/:id', productController.remove);

// // Sales:

// app.post('/sales', salesController.create);

// app.get('/sales', salesController.getAll);

// app.get('/sales/:id', salesController.getById);

// app.put('/sales/:id', salesController.update);

// app.delete('/sales/:id', salesController.remove);

// app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`o pai tá ON na: ${PORT}`);
});
