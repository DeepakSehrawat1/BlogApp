const express = require("express");

const route = express.Router();

const postcontroller = require("../controller/Post");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "../uploads/" });

route.post("/post", uploadMiddleware.single("file"), postcontroller.post);

route.get("/getPosts", postcontroller.getPost);

route.get("/detailPost/:id", postcontroller.details);

module.exports = route;
