const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let salt = bcrypt.genSaltSync(10);
require("dotenv").config();

exports.registration = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json("successfully created");
  } catch {
    res.status(500).json("not created");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, response.password);

    if (passOk) {
      jwt.sign(
        { username, id: response._id },
        process.env.key,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token)
            .json({ id: response._id, username });
        }
      );
    } else {
      res.status(500).json("wrong pass");
    }
  } catch {
    res.status(400).json("not found");
  }
};

exports.profile = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }
  jwt.verify(token, process.env.key, {}, (err, info) => {
    if (err) throw err;

    res.json(info);
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
