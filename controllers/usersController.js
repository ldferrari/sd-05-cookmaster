const { Router } = require('express');

const usersRouter = Router();
// const rescue = require('express-rescue');

const usersServices = require('../services/usersServices');
// const usersModel = require('../models/usersModel');

// Controller pode chamar diretamente model tb, pulando service.

// 1 - Crie um endpoint para o cadastro de usuários
usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userCreated = await usersServices.create(name, email, password);
    if (!userCreated) return res.status(400).json({ message: 'User was not created' });
    return res.status(201).json(userCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 'conflict') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

// // 2 - Crie um endpoint para listar os produtos
// router.get('/', async (req, res) => {
//   try {
//     const products = await prodModel.getAll();
//     res.status(200).json({ products }); // formato pedido no req
//   } catch (err) {
//     // sem cenário de invalid_data neste caso
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

// // Escritura com o rescue seria:
// // router.get('/', rescue (async (req, res) => {
// //   const products = await prodModel.getAll();
// //   res.status(200).json({ products });
// // }));
// // Nao escolhida por conta de nao retornar mensagem 500.

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const prodById = await prodService.getById(id);
//     res.status(200).json(prodById);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err });
//     }
//     console.error(err);
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

// // 3 - Crie um endpoint para atualizar um produto
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   try {
//     const updatedProd = await prodService.updateById(id, name, quantity);
//     res.status(200).json(updatedProd);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err });
//     }
//     console.error(err);
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await prodService.deleteById(id);
//     return res.status(200).json(deletedProduct);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err });
//     }
//     console.error(err);
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

module.exports = usersRouter;
