const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  duration: Number,
  exercises: [{ type: Schema.Types.ObjectId, ref: "exercises" }],
});

module.exports = mongoose.model("workouts", workoutSchema);
