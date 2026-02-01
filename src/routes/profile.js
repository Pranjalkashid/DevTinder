const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/adminAuthentication");

profileRouter.get("/profile", userAuth, async (req, res, next) => {
  try {
    const userData = req.userData;
    res.send(userData);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = profileRouter;
