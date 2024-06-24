const express = require("express");

const route = express.Router();

const usercontroller = require("../controller/user");

route.post("/register", usercontroller.registration);

route.post("/login", usercontroller.login);

route.get("/profile", usercontroller.profile);

route.post("/logout", usercontroller.logout);

module.exports = route;
