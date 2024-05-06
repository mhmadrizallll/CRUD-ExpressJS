const { comparePassword } = require("../src/helpers/bcrypt.js");
const loginValid = require("../src/validation/login.js");
const regValid = require("../src/validation/register.js");

const User = require("../models").User;

class UserController {
  static signup(req, res) {
    const data = {
      title: "Sign Up",
      layout: "layout/main-layout",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("signup", data);
  }

  static signupCreate(req, res) {
    let hasil = regValid(req.body);
    if (hasil.message.length > 0) {
      res.status(400);
      req.flash("message", ["error", "Error !", hasil.message[0]]);
      req.flash("data", hasil.data);
      res.redirect("/signup");
    } else {
      const { nama, email, password } = req.body;

      User.findOne({
        where: {
          email,
        },
      })
        .then((user) => {
          if (user && user.email === req.body.email) {
            res.status(400);
            req.flash("message", ["error", "Error !", "Email sudah terdaftar"]);
            // return res.redirect("/signup");
          } else {
            return User.create({ nama, email, password });
          }
        })
        .then((createdUser) => {
          req.session.user = {
            nama: createdUser.nama,
            email: createdUser.email,
          };
          res.redirect("/login");
        })
        .catch((error) => {
          res.status(500);
          req.flash("message", ["error", "Error !", error.message]);
          res.redirect("/signup");
        });
    }
  }

  static login(req, res) {
    const data = {
      title: "Login",
      layout: "layout/main-layout",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("login", data);
  }

  static logged(req, res) {
    let foundUser;
    const hasil = loginValid(req.body);
    if (hasil.message.length > 0) {
      res.status(400);
      req.flash("message", ["error", "Error !", hasil.message[0]]);
      req.flash("data", hasil.data);
      res.redirect("/login");
    } else {
      const { email, password } = req.body;
      User.findOne({
        where: {
          email,
        },
      })
        .then((user) => {
          foundUser = user;
          if (!user) {
            res.status(400);
            req.flash("message", ["error", "Error !", "Email tidak terdaftar"]);
            // res.redirect("/login");
          } else {
            return comparePassword(password, user.password);
          }
        })
        .then((passwordTrue) => {
          if (!passwordTrue) {
            res.status(400);
            req.flash("message", ["error", "Error !", "Email/Password salah"]);
            res.redirect("/login");
          } else {
            req.session.user = {
              nama: foundUser.nama,
              email: foundUser.email,
            };
            res.redirect("/protected-page");
          }
        })
        .catch((error) => {
          res.status(500);
          req.flash("message", ["error", "Error !", error.message]);
          res.redirect("/login");
        });
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static protectedPage(req, res) {
    const data = {
      title: "Protected Page",
      layout: "layout/main",
      message: "Welcome " + req.session.user.nama,
    };
    res.render("protected-page", data);
  }

  static useProtectedPage(err, req, res, next) {
    req.flash("message", ["error", "Error !", err.message]);
    res.redirect("/login");
  }
}

module.exports = UserController;
