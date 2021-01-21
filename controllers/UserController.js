const { Router } = require('express');

// Router é agrupador de middlewares
const userRouter = Router();

const UserService = require('../services/UserService');


/*  ********************************************************************************************* */
// 1 - Crie um endpoint para o cadastro de produtos
// POST /product/ -> Comportamento de create
userRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const produtoCriado = await UserService.create(name, quantity);
    if (!produtoCriado) return res.status(400).json({ message: 'Produto não foi criado' });
    return res.status(201).json(produtoCriado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
