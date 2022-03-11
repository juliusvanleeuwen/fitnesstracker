require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 50001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.log(err));

// routes prefix
app.use("/api/list", require("./routes/list.routes"));
app.use("/api/meal", require("./routes/meal.routes"));
app.use("/api/ingredient", require("./routes/ingredient.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// start servers
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
