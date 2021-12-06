//importing mongoose
const mongoose = require("mongoose");

//defining a schema for a user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
});

//exporting user schema
module.exports = mongoose.model("user", userSchema, "users");
