const emailRegex = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

const validateEmail = (email) => {
  const isItValid = emailRegex.test(email);
  return isItValid;
};

module.exports = validateEmail;
