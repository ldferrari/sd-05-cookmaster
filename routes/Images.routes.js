// Thx to: https://expressjs.com/pt-br/api.html#res.sendFile

const express = require('express');

const router = express.Router();
router.get(
  '/:filename',
  (req, res, _next) => {
    const options = {
      root: 'uploads',
    };
    const { filename } = req.params;
    res.sendFile(filename, options);
  },
);

module.exports = router;
