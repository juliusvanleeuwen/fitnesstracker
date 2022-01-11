const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costSchema = mongoose.Schema({
  name: String,
  price: Number,
  open: Boolean,
  user: [{ type: Schema.Types.ObjectId, ref: "users" }],
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("costs", costSchema);
