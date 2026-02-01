const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middlewares/adminAuthentication");

requestRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (req, res, next) => {
    const user = req.user.userID;
    console.log(user);
    res.send(user.firstName + "Sent connection request");
  },
);

module.exports = requestRouter;
