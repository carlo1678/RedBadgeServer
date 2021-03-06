const Express = require("express");
const { validateJWT } = require("../middleware");
const validateAdmin = require("../middleware/validateAdmin");
// const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { FavoriteSongModel } = require("../models");

router.post("/add", validateJWT, async (req, res) => {
  const { url } = req.body.songs;
  const userId = req.user.id;
  const favoriteSong = {
    url: url,
    userId: userId,
  };
  try {
    const newFavorite = await FavoriteSongModel.create(favoriteSong);
    console.log(newFavorite);
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/mine", validateJWT, async (req, res) => {
  let userId = req.user.id;
  try {
    const entries = await FavoriteSongModel.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/all", validateJWT, async (req, res) => {
  try {
    const entries = await FavoriteSongModel.findAll({});
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:songId", validateJWT, async (req, res) => {
  const mbid = req.body.songs;
  const songId = req.body.songId;
  const userId = req.user.id;

  const query = {
    where: {
      songId: songId,
      owner: userId,
    },
  };

  const updatedSong = {
    mbid: mbid,
  };

  try {
    const update = await FavoriteSongModel.update(updatedSong, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
  const { mbid } = req.body.songs;
  const userId = req.user.id;

  try {
    const query = {
      where: {
        mbid: mbid,
        userId: userId,
      },
    };

    const deleteSong = await FavoriteSongModel.destroy(query);
    res.status(200).json(deleteSong);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete/admin/:id", validateAdmin, async (req, res) => {
  const { id } = req.body.songs;

  try {
    const query = {
      where: {
        id: id,
      },
    };

    const deleteSong = await FavoriteSongModel.destroy(query);
    res.status(200).json(deleteSong);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Ask question about deleting. Specifically about the route containing :id

module.exports = router;
