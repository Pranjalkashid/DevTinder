const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../Utils/Validation");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

authRouter.post("/Signup", async (req, res, next) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();
    res.send("Data  saved successfully!!");
  } catch (err) {
    throw new Error(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email not present in DB");
    }
    const isPasswordvalid = await user.validateUserPassword(password);
    if (isPasswordvalid) {
      const token = await user.createJWT();
      console.log("token", token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });

      res.send("login success");
    } else {
      throw new Error("Login failed!!");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = authRouter;
