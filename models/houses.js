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
  user: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

module.exports = mongoose.model("houses", houseSchema);
