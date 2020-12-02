module.exports = (email) => {
  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  return regexEmail.test(String(email).toLowerCase());
};
