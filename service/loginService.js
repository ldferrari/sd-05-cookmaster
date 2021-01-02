// const model = require('../models/loginModel');

// const regEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

// const create = async (email, password) => {
//   // console.log(user);
//   // const { email, password } = user;
//   const user = await model.checkEmail(email);
//   if (!email || !password) {
//     return {
//       error: true,
//       code: 'unauthorized_data',
//       message: 'All fields must be filled',
//     };
//   }
//   if (!user || !email.match(regEmail)) {
//     return {
//       error: true,
//       code: 'invalid_user',
//       message: 'Incorrect username or password',
//     };
//   }
//   console.log(user);
//   return model.create(user);
// };

// module.exports = {
//   create,
// };
