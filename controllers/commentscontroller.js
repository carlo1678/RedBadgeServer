const Express = require("express");
const validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { CommentsModel } = require("../models");
