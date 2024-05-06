const express = require("express");
const appMiddleware = express();

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressEjsLayouts = require("express-ejs-layouts");
const flash = require("express-flash");

const path = require("path");
require("../../logs/log.js");
// appMiddleware.set("views", path.join(__dirname, "views"));

// appMiddleware.set("view engine", "ejs");
appMiddleware.use(expressEjsLayouts);
appMiddleware.use(express.static(path.join(__dirname, "../../public")));
appMiddleware.use(bodyParser.json());
appMiddleware.use(bodyParser.urlencoded({ extended: true }));
appMiddleware.use(upload.array());
appMiddleware.use(cookieParser());
appMiddleware.use(
  session({ secret: "secret", resave: false, saveUninitialized: false })
);
appMiddleware.use(flash());

module.exports = appMiddleware;
