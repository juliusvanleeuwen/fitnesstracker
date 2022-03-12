const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = mongoose.Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("muscles", muscleSchema);
