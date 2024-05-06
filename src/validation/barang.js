const validator = require("validator");

const sanitization = (data) => {
  return {
    nama_barang: validator.escape(validator.trim(data.nama_barang)),
    jumlah: validator.escape(validator.trim(data.jumlah)),
    harga_satuan: validator.escape(validator.trim(data.harga_satuan)),
  };
};

const barangValid = (dt) => {
  let message = [];
  let data = sanitization(dt);

  if (validator.isEmpty(data.nama_barang)) {
    message.push("Nama barang harus diisi");
  }
  if (validator.isEmpty(data.jumlah)) {
    message.push("Jumlah harus diisi");
  }
  if (validator.isEmpty(data.harga_satuan)) {
    message.push("Harga satuan harus diisi");
  }

  return { message, data };
};

module.exports = { barangValid };
