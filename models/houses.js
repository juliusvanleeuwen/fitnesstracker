const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = mongoose.Schema({
  name: String,
  street: String,
  housenumber: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
  creator: { type: Schema.Types.ObjectId, ref: "users" },
  owners: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

module.exports = mongoose.model("houses", houseSchema);
