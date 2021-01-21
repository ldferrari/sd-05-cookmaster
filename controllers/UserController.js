const { Router } = require('express');

// Router é agrupador de middlewares
const userRouter = Router();

const UserService = require('../services/UserService');
/*  ********************************************************************************************* */
// 1 - Crie um endpoint para o cadastro de produtos
// POST /product/ -> Comportamento de create
userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userCriado = await UserService.create(name, email, password);
    if (!userCriado) return res.status(400).json({ message: 'Usuário Não Criado!' });
    return res.status(201).json(userCriado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ err });
    }
    if (err.code === 'conflict') {
      return res.status(409).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await UserService.getAll();
    // com status http 200
    res.status(200).json({ users });
  } catch (err) {
    // sem cenário de invalid_data neste caso
    res.status(500).json({ message: 'Internal error' });
  }
});

module.exports = userRouter;
