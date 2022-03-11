const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = mongoose.Schema({
  name: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  duration: number,
  exercises: [{ type: Schema.Types.ObjectId, ref: "exercises" }],
});

module.exports = mongoose.model("workouts", workoutSchema);
