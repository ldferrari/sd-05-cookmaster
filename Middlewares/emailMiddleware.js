// isso tem que ficar no controller
const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(String(email).toLowerCase());
};

module.exports = {
  validateEmail,
};
