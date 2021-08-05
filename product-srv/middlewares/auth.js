var admin = require("../firebase/");
const User = require("../models/userModel");

exports.authCheck = async (req, res, next) => {
  let auth = req.headers.authtoken;
  try {
    let user = await defaultAuth.verifyIdToken(auth);
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    const newError = new Error(err);
    newError.status = 401;
    next(newError);
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    const newError = new Error("Admin resource. Access denied!");
    newError.status = 403;
    next(newError);
  } else {
    next();
  }
};
