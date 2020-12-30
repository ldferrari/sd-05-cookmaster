const ROLES = {
  user: 'user',
  admin: 'admin',
};

const error = {
  invalidEntries: {
    message: 'Invalid entries. Try again.',
  },
  emailExists: {
    message: 'Email already registered',
  },
};

module.exports = {
  ROLES, error,
};
