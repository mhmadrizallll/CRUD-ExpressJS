// import express from "express";
const express = require("express");
const app = express();
const port = 3000;

// import routes from "./routes/index.js";
const routes = require("./routes/index.js");
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//
// Gunakan process.cwd() untuk mendapatkan direktori kerja saat ini dalam CommonJS
// const currentDir = process.cwd();

// app.set("views", path.join(currentDir, "views"));
// app.set("view engine", "ejs");
// app.use(expressEjsLayouts);
// app.use(express.static(path.join(currentDir, "public")));
//
const path = require("path");
const appMiddleware = require("./middlewares/index.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(appMiddleware);
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
