const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
});

module.exports = mongoose.model("exercises", exerciseSchema);
