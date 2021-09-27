const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
  comment: {
    type: DataTypes.STRING(255),
  },
});

module.exports = Comments;
