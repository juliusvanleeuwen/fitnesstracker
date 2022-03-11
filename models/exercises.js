const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
  name: String,
  street: String,
  housenumber: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
  muscleGroup: {
    type: Schema.Types.ObjectId,
    ref: "muscleGroups",
    default: null,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  workouts: [{ type: Schema.Types.ObjectId, ref: "workouts" }],
});

module.exports = mongoose.model("exercises", exerciseSchema);
