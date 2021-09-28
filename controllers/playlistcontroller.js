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
