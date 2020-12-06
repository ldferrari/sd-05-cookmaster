const emailRegex = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

const validateEmail = (email) => {
  const isItValid = emailRegex.test(email);
  console.log(isItValid);
  return isItValid;
};

module.exports = validateEmail;
