const jwt = require("jsonwebtoken");

const Post = require("../Model/post.js");
const fs = require("fs");

require("dotenv").config();
exports.post = async (req, res, next) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }
    const { title, summary, content } = req.body;
    jwt.verify(token, process.env.key, {}, async (err, info) => {
      if (err) throw err;

      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (err) {
    res.json(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const postbox = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(postbox);
  } catch (err) {
    res.json(err);
  }
};

exports.details = async (req, res) => {
  try {
    const { id } = req.params;

    const postDoc = await Post.findById(id);

    res.json(postDoc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
