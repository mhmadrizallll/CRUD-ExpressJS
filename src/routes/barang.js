const express = require("express");
const BarangController = require("../../controllers/barang.js");
const barangRouter = express.Router();

barangRouter.get("/", BarangController.getBarang);
barangRouter.get("/insert", BarangController.insertGetBarang);
barangRouter.post("/", BarangController.insertPostBarang);
barangRouter.get("/:id", BarangController.getEditBarang);
barangRouter.post("/:id", BarangController.setEditBarang);

module.exports = { barangRouter };
