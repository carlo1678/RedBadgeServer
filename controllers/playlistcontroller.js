const Express = require("express");
const { validateJWT } = require("../middleware");
const router = Express.Router();
const { PlaylistModel } = require("../models");

router.post("/add", validateJWT, async (req, res) => {
  const { title, description } = req.body.playlist;
  const userId = req.user.id;
  const comment = {
    title,
    description,
    userId: userId,
  };
  try {
    const newComment = await PlaylistModel.create(comment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/mine", validateJWT, async (req, res) => {
  let userId = req.user.id;
  try {
    const playlists = await PlaylistModel.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:playlistId", validateJWT, async (req, res) => {
  const { title, description } = req.body.playlist;
  const playlistId = req.params.playlistId;
  const userId = req.user.id;

  const query = {
    where: {
      id: playlistId,
      userId: userId,
    },
  };

  const updatedPlaylist = {
    title: title,
    description: description,
  };

  try {
    const update = await PlaylistModel.update(updatedPlaylist, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
  const playlistId = req.params.id;
  const ownerId = req.user.id;

  try {
    const query = {
      where: {
        userId: ownerId,
        id: playlistId,
      },
    };

    const deletePlaylist = await PlaylistModel.destroy(query);
    res.status(200).json(deletePlaylist);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
