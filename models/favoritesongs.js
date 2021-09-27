const { DataTypes } = require("sequelize");
const db = require("../db");

const FavoriteSong = db.define("songs", {
  mbid: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = FavoriteSong;
