const validator = require("validator");

const sanitization = (data) => {
  return {
    nama: validator.escape(validator.trim(data.nama)),
    email: validator.escape(validator.trim(data.email)),
    password: validator.trim(data.password),
  };
};

const regValid = (dt) => {
  let message = [];
  let data = sanitization(dt);
  if (validator.isEmpty(data.nama)) {
    message.push("Nama harus diisi");
  }
  if (validator.isEmpty(data.email)) {
    message.push("Email harus diisi");
  }
  if (!validator.isEmail(data.email)) {
    message.push("Email tidak valid");
  }
  if (validator.isEmpty(data.password)) {
    message.push("Password harus diisi");
  }
  if (!validator.isStrongPassword(data.password)) {
    message.push(
      "Password harus terdiri dari 8 karakter, huruf besar dan kecil, 1 angka, dan 1 simbol"
    );
  }
  return { message, data };
};

module.exports = regValid;
