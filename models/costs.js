const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costSchema = mongoose.Schema({
    name: String,
    price: Number,
    user: { type: Schema.Types.ObjectId, ref: "users" },
    created: {
        type: Date,
        default: Date.now(),
    },
    party: { type: Schema.Types.ObjectId, ref: "parties" },
});

module.exports = mongoose.model("costs", costSchema);