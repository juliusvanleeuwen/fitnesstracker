const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partySchema = mongoose.Schema({
  name: String,
  date: Date,
  open: Boolean,
  house: { type: Schema.Types.ObjectId, ref: "houses" },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("parties", partySchema);
