const jwt = require('jsonwebtoken');

const { Router } = require('express');

const User = require('../Models/usersModel');

const logins = Router();

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

logins.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const findEmail = await User.getByEmail({ email });

    if (!findEmail) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    /* if (password.length <= 6) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    } */

    const user = await User.create(email);
    const { password: _, ...userWithoutPassword } = user;
    const payload = {
      // Issuer => Quem emitiu o token
      iss: 'post_api',
      // Audience => Quem deve aceitar este token
      aud: 'identify',
      // Subject => A quem pertence esse token
      // sub: user._id,
      userData: userWithoutPassword,
    };
    const token = jwt.sign(payload, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = logins;
