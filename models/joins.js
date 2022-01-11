const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const joinSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: String,
  created: {
    type: Date,
    default: Date.now(),
  },
  party: { type: Schema.Types.ObjectId, ref: "parties" },
});

module.exports = mongoose.model("joins", joinSchema);
