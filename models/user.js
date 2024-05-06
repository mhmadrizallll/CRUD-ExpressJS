"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../src/helpers/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: function (user, op, fn) {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
