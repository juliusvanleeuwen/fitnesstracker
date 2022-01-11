const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  created: {
    type: Date,
    default: Date.now(),
  },
  password: String,
});

module.exports = mongoose.model("users", userSchema);
