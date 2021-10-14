const Express = require("express");
const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { CommentsModel } = require("../models/");

router.post("/add", validateJWT, async (req, res) => {
  const comment = req.body.comments.comment;
  const userId = req.user.userId;
  const Comment = {
    comment,
    userId,
  };
  try {
    const newComment = await CommentsModel.create(Comment);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get("/getall", async (req, res) => {
  let songId = req.body.songId;
  try {
    const comments = await CommentsModel.findAll({
      where: {
        songId: songId,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Add a get all route, to get all comments. (findAll where you match songId)

router.delete("/delete/:id", validateJWT, async (req, res) => {
  const comment = req.body.comments;
  const userId = req.user.userId;

  try {
    const query = {
      where: {
        comment: comment,
        userId: userId,
      },
    };

    const deleteComment = await CommentsModel.destroy(query);
    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
