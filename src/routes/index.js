// import express from "express";
const express = require("express");
const routes = express.Router();
const UserController = require("../../controllers/user");
const checkLogin = require("../middlewares/checklogin");
const { barangRouter } = require("./barang");

routes.get("/", (req, res) => {
  res.redirect("/protected-page");
});

routes.get("/signup", UserController.signup);
routes.post("/signup", UserController.signupCreate);

routes.get("/login", UserController.login);
routes.post("/login", UserController.logged);

routes.get("/logout", UserController.logout);
routes.get("/protected-page", checkLogin, UserController.protectedPage);
routes.use("/barang", checkLogin, barangRouter);

routes.use("*", UserController.useProtectedPage);

module.exports = routes;
