const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = mongoose.Schema({
  title: String,
  created: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("muscles", muscleSchema);
