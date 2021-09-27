const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let { email, password } = req.body.user;
  try {
    const User = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 13),
    });
    const token = jwt.sign({ id: User.id }, "i_am_secret", {
      expiresIn: 60 * 60 * 12,
    });
    console.log(User.id);
    res.status(201).json({
      message: "User Registered",
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register",
      });
      console.log(err);
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );
      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, "i_am_secret", {
          expiresIn: "1d",
        });
        res.status(200).json({
          user: loginUser,
          message: "User logged in!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to login user",
    });
  }
});

module.exports = router;
