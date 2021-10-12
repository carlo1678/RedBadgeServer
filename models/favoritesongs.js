const { DataTypes } = require("sequelize");
const db = require("../db");

const FavoriteSong = db.define("songs", {
  url: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = FavoriteSong;
