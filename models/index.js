const UserModel = require("./user");
const FavoriteSongModel = require("./favoritesongs");
const PlaylistModel = require("./playlist");
const Comments = require("./comments");

UserModel.hasMany(FavoriteSongModel);
PlaylistModel.hasMany(FavoriteSongModel);
PlaylistModel.belongsTo(UserModel);
FavoriteSongModel.belongsTo(UserModel);
Comments.belongsTo(UserModel);
PlaylistModel.hasMany(Comments);
UserModel.hasMany(PlaylistModel);

module.exports = { UserModel, FavoriteSongModel, PlaylistModel, Comments };
