const db = require("../models");
const User = db.user;

exports.singleUser = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: "Can't find user!"
      });
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

exports.users = async (req, res) => {
  try {
    let users = await User.findAll();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};