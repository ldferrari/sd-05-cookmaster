const services = require('../services');

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await services.users.create(name, email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'invalid_email') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

// const login = async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const profile = await services.users.login(name, password);
//     console.log(profile);
//     res.status(200).json(profile);
//   } catch (err) {
//     if (err.code === 'invalid_data' || err.code === 'incorrect_data') {
//       return res.status(401).json({ message: err.message });
//     }
//     console.error(err.message);
//     res.status(401).json({ message: err.message });
//   }
// };

module.exports = {
  create,
};
