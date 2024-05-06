const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    let err = new Error("Anda belum login");
    next(err);
  }
};

module.exports = checkLogin;
