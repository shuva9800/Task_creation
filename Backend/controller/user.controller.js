const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signupHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field to be filled",
      });
    }
    const findPerson = await User.findOne({ email });
    if (findPerson) {
      return res.status(400).json({
        success: false,
        message: "User is already exist Login Now",
      });
    }

    const hasPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      userName: username,
      email,
      password: hasPassword,
    });
    await newUser.save();

    newUser.password = "undefined";
    return res.status(200).json({
      success: true,
      message: "User Signin successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
//login page
exports.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "fill all the field",
      });
    }

    //find person present in db or not
    const person = await User.findOne({ email: email });
    if (!person) {
      return res.status(404).json({
        success: false,
        message: "user nor register go to signin page",
      });
    }

    //compare password
    const validPassword = bcrypt.compareSync(password, person.password);

    if (validPassword) {
      const token = jwt.sign({ id: person._id }, process.env.jwt_secret);
      person.password = "undefined";

      return res
        .cookie("loginToken", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({
          success: true,
          message: "user login successfully",
          token,
          data: person,
        });
    } else {
      return res.status(404).json({
        success: false,
        message: "password does not match try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
