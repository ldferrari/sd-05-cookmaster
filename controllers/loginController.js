const services = require('../services');

const { tokenJWT } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const profile = await services.users.login(email, password);

    const token = await tokenJWT(profile);
    res.status(200).json({ token });
  } catch (err) {
    if (err.code === 'invalid_data' || err.code === 'incorrect_data') {
      return res.status(401).json({ message: err.message });
    }
    console.error(err.message);
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  login,
};
