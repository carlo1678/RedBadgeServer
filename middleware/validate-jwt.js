const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const validateJWT = async (req, res, next) => {
  try {
    if (req.method == "OPTIONS") {
      next();
    } else if (
      req.headers.authorization &&
      req.headers.authorization.includes("Bearer")
    ) {
      const { authorization } = req.headers;
      const payload = authorization
        ? jwt.verify(authorization, "i_am_secret")
        : undefined;

      if (payload) {
        let foundUser = await UserModel.findOne({ where: { id: payload.id } });
        console.log(payload);
        if (foundUser) {
          req.user = foundUser;
          next();
        } else {
          res.status(400).send({ message: "Not Authorized" });
        }
      } else {
        res.status(401).send({ message: "Invalid token" });
      }
    } else {
      res.status(403).send({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = validateJWT;
