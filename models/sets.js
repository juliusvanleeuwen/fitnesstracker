const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setSchema = mongoose.Schema({
  weight: Number,
  reps: Number,
  exercise: { type: Schema.Types.ObjectId, ref: "exercises" },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("sets", setSchema);