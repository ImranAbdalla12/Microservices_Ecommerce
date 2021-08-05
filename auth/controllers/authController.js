const User = require("../models/authModel");
const userCreatedPublisher = require("../events/authPublisher")
const userUpdatedPublisher = require("../events/authPublisher")
const { subjects } = require("nats-ecom-streaming");
exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
      { email },
      { name: email.split("@")[0], picture },
      { new: true }
    );
    if (user) {
      console.log("USER UPDATED", user);
      new userUpdatedPublisher('user:updated').publish(
        JSON.stringify(user)
      );
      res.json(user);
    } else {
      const newUser = await new User({
        email,
        name: email.split("@")[0],
        picture,
      }).save();
      console.log("USER CREATED ============", newUser);
      new userCreatedPublisher('user:created').publish(
        JSON.stringify(newUser)
      );
      res.json(newUser);
    }
  } catch (error) {
    const newError = new Error(error);
    next(newError);
  }
};
exports.currentUser = async (req, res, next) => {
  try {
    User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    });
  } catch (error) {
    const newError = new Error(error);
    next(newError);
  }
};
