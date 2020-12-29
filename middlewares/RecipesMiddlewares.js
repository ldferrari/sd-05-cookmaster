const ErrorsEnums = require('../enumerators/ErrorsEnums');

const verifyRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).send(ErrorsEnums.invalidEntries);
  }
  next();
};

module.exports = { verifyRecipe };
