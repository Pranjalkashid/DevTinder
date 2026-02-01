const express = require("express");
const userAuth = require("./middlewares/adminAuthentication");
const connectDB = require("./config/Database");
const User = require("./Models/User");
const app = express();
const Validator = require("validator");
const { validateSignUpData } = require("./Utils/Validation");
app.use(express.json()); // middleware
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // middleware
const jwt = require("jsonwebtoken");

connectDB()
  .then(() => {
    console.log("connection suceessfully done");

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed err:", err);
  });

app.post("/login", async (req, res, next) => {
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
app.get("/profile", userAuth, async (req, res, next) => {
  try {
    const userData = req.userData;
    res.send(userData);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/Signup", async (req, res, next) => {
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

app.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  const user = req.user.userID;
  console.log(user);
  res.send(user.firstName + "Sent connection request");
});
