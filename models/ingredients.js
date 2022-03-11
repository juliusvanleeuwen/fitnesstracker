const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = mongoose.Schema({
  name: String,
  calories: String,
  sugars: Number,
});

module.exports = mongoose.model("ingredients", ingredientSchema);
