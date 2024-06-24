const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const postRoute = require("./Routes/postRoutes.js");
const userRoute = require("./Routes/userRoutes.js");
//const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
//const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
//const key = "sgrtngfnfgerthtyngbfvdsfghhgferhthdbfvdfhfg";
//const multer = require("multer");
//const uploadMiddleware = multer({ dest: "uploads/" });

//const fs = require("fs");

const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(userRoute);
app.use(postRoute);

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = path.join(__dirname, "uploads");
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder); // Specify the destination directory for the uploaded files
  },
  filename: function (req, file, cb) {
    // You can customize the filename here
    const fileExtension = file.mimetype.split("/")[1]; // Get the file extension from mimetype
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });*/

mongoose.connect(process.env.mongo);

/*app.use("/register", async (req, res) => {
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
});

app.use("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, response.password);

    if (passOk) {
      jwt.sign({ username, id: response._id }, key, {}, (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .cookie("token", token)
          .json({ id: response._id, username });
      });
    } else {
      res.status(500).json("wrong pass");
    }
  } catch {
    res.status(400).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }
  jwt.verify(token, key, {}, (err, info) => {
    if (err) throw err;

    res.json(info);
  });
});

app.use("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.use("/post", uploadMiddleware.single("file"), async (req, res, next) => {
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
    jwt.verify(token, key, {}, async (err, info) => {
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
});

app.use("/getPosts", async (req, res) => {
  try {
    const postbox = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(postbox);
  } catch (err) {
    res.json(err);
  }
});

app.use("/detailPost/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postDoc = await Post.findById(id);

    res.json(postDoc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});*/

/*app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  } else if (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

  next();
});*/
app.listen(5000);
