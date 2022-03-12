const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
  name: String,
  weight: Number,
  reps: Number,
  muscleGroup: {
    type: Schema.Types.ObjectId,
    ref: "muscles",
    default: null,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  workouts: [{ type: Schema.Types.ObjectId, ref: "workouts" }],
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("exercises", exerciseSchema);
