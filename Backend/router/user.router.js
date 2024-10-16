const express = require("express");
const {
  signupHandler,
  loginHandler,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/register", signupHandler);
router.post("/login", loginHandler);

module.exports = router;
