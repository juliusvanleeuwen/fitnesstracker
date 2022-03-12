const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = mongoose.Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  duration: Number,
  exercises: [{ type: Schema.Types.ObjectId, ref: "exercises" }],
  muscles: [{ type: Schema.Types.ObjectId, ref: "muscles" }],
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("workouts", workoutSchema);
