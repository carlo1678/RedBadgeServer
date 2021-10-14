const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const validateAdmin = async (req, res, next) => {
  try {
    if (req.method == "OPTIONS") {
      next();
    } else if (
      req.headers.authorization &&
      req.headers.authorization.includes("Bearer")
    ) {
      const { authorization } = req.headers;
      const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
              ? authorization.split(" ")[1]
              : authorization,
            process.env.JWT_SECRET
          )
        : undefined;

      if (payload) {
        let foundUser = await UserModel.findOne({
          where: { id: payload.id, admin: true },
        });
        // Put a comma after payload.id, make whatever field is called in the user table for admin = true.
        // console.log(payload);
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

// Make another file within middleware, called validate-admin. It looks very similar to validate-jwt, except for one line.

module.exports = validateAdmin;
