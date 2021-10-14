const UserModel = require("./user");
const FavoriteSongModel = require("./favoritesongs");
const CommentsModel = require("./comments");

UserModel.hasMany(FavoriteSongModel);
FavoriteSongModel.belongsTo(UserModel);

FavoriteSongModel.hasMany(CommentsModel);
CommentsModel.belongsTo(UserModel);

module.exports = { UserModel, FavoriteSongModel, CommentsModel };
