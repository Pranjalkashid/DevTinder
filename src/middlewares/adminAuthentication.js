const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token ");
    }
    const decodedMsgRecieved = await jwt.verify(token, "DevTinder@");

    const { _id } = decodedMsgRecieved;

    const userData = await User.findById(_id);
    if (!userData) {
      throw new Error("error finding userData");
    }
    req.userData = userData;

    next();
  } catch (err) {
    res.status(400).send("Error:" + err.message);
    throw new Error(err);
  }
};
module.exports = userAuth;
