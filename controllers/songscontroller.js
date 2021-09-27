const Express = require("express");
const { validateJWT } = require("../middleware");
// const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { FavoriteSongModel } = require("../models/favoritesongs");

router.post("/add", validateJWT, async (req, res) => {
  const { mbid } = req.body.songs;
  const userId = req.user.id;
  const favoriteSong = {
    mbid: mbid,
    userId: userId,
  };
  try {
    const newFavorite = await FavoriteSongModel.create(favoriteSong);
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
