const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleGroupSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  created: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  house: { type: Schema.Types.ObjectId, ref: "houses" },
});

module.exports = mongoose.model("muscleGroups", muscleGroupSchema);
