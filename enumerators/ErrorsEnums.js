const error = {
  invalidEntries: {
    message: 'Invalid entries. Try again.',
  },
  emailExists: {
    message: 'Email already registered',
  },
  missingFields: { message: 'All fields must be filled' },
  incorrectFields: { message: 'Incorrect username or password' },
  invalidToken: { message: 'jwt malformed' },
  noRecipe: { message: 'recipe not found' },
  missingToken: { message: 'missing auth token' },
  notAdmin: { message: 'Only admins can register new admins' },
};

module.exports = { ...error };
