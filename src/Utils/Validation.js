const validator = require("validator");

const validateSignUpData = (req) => {
  console.log("validate func called");
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("FirstName and LastName required!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invallid emailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

module.exports = { validateSignUpData };
