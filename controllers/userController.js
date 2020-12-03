const service = require('../services/userServices');
// const model = require('../models/salesModel');
// const model = require('../models/productsModel');

const login = async (req, res) => {
  try {
    const dadosBody = req.body;
    // console.log(dadosBody);
    const getlogin = await service.login(dadosBody);
    // console.log(login);
    if (getlogin.error) {
      if (getlogin.code === 'Unauthorized') {
        return res.status(401).json({ message: getlogin.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no login' });
    }
    res.status(200).json({ token: getlogin });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no LOGIN' });
  }
};

// const getAll = async (req, res) => { // rescue(
//   try {
//     // const sales = await service.getAll();
//     const sales = await model.getAllSales();
//     // console.log(sales);
//     res.status(200).json({ sales });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Algo deu ruim no getAll sales' });
//   }
// }; // )

// const getById = async (req, res) => { // rescue(
//   const { id } = req.params;
//   try {
//     const sale = await service.getById(id);
//     // console.log(sale);
//     res.status(200).json(sale);
//   } catch (err) {
//     // console.log(err);
//     if (err.code === 'not_found') {
//       return res.status(404).json({ err: { code: err.code, message: err.message } });
//     }
//     // console.error(err);
//     res.status(500).json({ message: 'Algo deu errado no sales getId' });
//   }
// }; // )

const create = async (req, res) => {
  try {
    const dadosBody = req.body;
    // console.log(dadosBody);
    const createdUser = await service.create(dadosBody);
    // console.log(createdUser);
    if (createdUser.error) {
      if (createdUser.code === 'Bad Request') {
        return res.status(400).json({ message: createdUser.message });
      }
      if (createdUser.code === 'Conflict') {
        return res.status(409).json({ message: createdUser.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no create user' });
    }
    res.status(201).json({ user: createdUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no create user' });
  }
};

// const update = async (req, res) => { // rescue(
//   const { id } = req.params;
//   const { productId, quantity } = req.body[0]; // ?[0]
//   // console.log(id, productId, quantity);
//   try {
//     const updatedSale = await service.update(id, productId, quantity);
//     res.status(200).json(updatedSale); // não seria 204?
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err: { code: err.code, message: err.message } });
//     }
//     // console.error(err.message);
//     res.status(500).json({ message: 'Algo deu errado no update' });
//   }
// }; // )

// const remove = async (req, res) => { // rescue(
//   const { id } = req.params;
//   try {
//     const removed = await service.exclude(id);
//     res.status(200).json(removed);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err: { code: err.code, message: err.message } });
//     }
//     console.error(err.message);
//     res.status(500).json({ message: 'Algo deu errado no REMOVE' });
//   }
// };

module.exports = {
  login,
  // getAll,
  // getById,
  create,
  // update,
  // remove,
};
