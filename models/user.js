const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Add a role within the User model itself, after line 13. Set up admin as a role with a boolean as true or false. Set a default value for false. Create the initial admin user in Postman.

module.exports = User;
