const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
  task: String,
  daysTillDeadline: Number,
  deadline: Date,
  //1 = not done 2 = not started 3 = done
  status: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  list: { type: Schema.Types.ObjectId, ref: "lists" },
  responsibleUsers: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

module.exports = mongoose.model("tasks", taskSchema);
