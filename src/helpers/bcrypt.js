const bcrypt = require("bcryptjs");
const saltRound = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRound);
};

const comparePassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

module.exports = { hashPassword, comparePassword };
