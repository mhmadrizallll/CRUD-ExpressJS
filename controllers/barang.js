const { barangValid } = require("../src/validation/barang.js");
// const { DataTypes } = require("sequelize");

const Barang = require("../models").Barang;

class BarangController {
  static getBarang(req, res, next) {
    Barang.findAll()
      .then((barang) => {
        const data = {
          title: "Barang",
          layout: "layout/main",
          message: req.flash("message"),
          data: barang,
        };
        res.render("barang/index", data);
      })
      .catch((err) => {
        res.status(400);
        req.flash("message", ["error", "Error !", err.message]);
        next(err);
      });
  }

  static insertGetBarang(req, res, next) {
    const data = {
      title: "Insert",
      layout: "layout/main",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("barang/insert", data);
  }

  static insertPostBarang(req, res, next) {
    const hasil = barangValid(req.body);
    const { nama_barang, jumlah, harga_satuan, expire_data } = hasil.data;
    if (hasil.message.length > 0) {
      res.status(400);
      req.flash("message", ["error", "Error !", hasil.message[0]]);
      req.flash("data", hasil.data);
      res.redirect("/barang/insert");
    } else {
      Barang.create({
        nama_barang,
        jumlah,
        harga_satuan,
        expire_data,
      })
        .then(() => {
          res.status(200);
          req.flash("message", [
            "success",
            "Berhasil",
            "Barang berhasil ditambahkan",
          ]);
          res.redirect("/barang");
        })
        .catch((err) => {
          res.status(400);
          req.flash("message", ["error", "Error !", err.message]);
          req.flash("data", req.body);
          res.redirect("/barang/insert");
        });
    }
  }

  static getEditBarang(req, res, next) {
    Barang.findByPk(req.params.id)
      .then((barang) => {
        const data = {
          title: "Edit Barang",
          layout: "layout/main",
          message: req.flash("message"),
          data: barang,
        };
        res.render("barang/edit", data);
      })
      .catch((err) => {
        res.status(400);
        req.flash("message", ["error", "Error !", err.message]);
        next(err);
      });
  }

  static setEditBarang(req, res, next) {
    const { id, mode } = req.body;
    const out = barangValid(req.body);
    const outerror = [{ id: id, ...out.data }];

    if (out.message.length > 0) {
      req.flash("message", ["error", "Gagal", out.message[0]]);
      req.flash("data", outerror);
      res.redirect(`/barang/${id}`);
    } else {
      let barang;
      if (mode === "update") {
        barang = Barang.update(out.data, {
          where: {
            id: id,
          },
        });
      } else {
        barang = Barang.destroy({
          where: {
            id: id,
          },
        });
      }

      barang
        .then((hasil) => {
          if (hasil) {
            req.flash("message", [
              "success",
              "Berhasil",
              mode === "update"
                ? "Berhasil mengubah barang!"
                : "Berhasil menghapus barang!",
            ]);
            res.redirect("/barang");
          } else {
            req.flash("message", [
              "error",
              "Gagal",
              mode === "update"
                ? "Gagal mengubah barang!"
                : "Gagal menghapus barang!",
            ]);
            res.redirect(`/barang/${id}`);
          }
        })
        .catch((err) => {
          req.flash("message", ["error", "Gagal", err.message]);
          res.redirect(`/barang/${id}`);
        });
    }
  }
}

module.exports = BarangController;
