const express = require("express");
const userAuth = require("./middlewares/adminAuthentication");
const connectDB = require("./config/Database");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/requests");

const app = express();
const Validator = require("validator");
app.use(express.json()); // middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // middleware

connectDB()
  .then(() => {
    console.log("connection suceessfully done");

    router.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed err:", err);
  });

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
