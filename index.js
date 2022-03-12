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
app.use("/api/workout", require("./routes/workout.routes"));
app.use("/api/exercise", require("./routes/exercise.routes"));
app.use("/api/muscle", require("./routes/muscle.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// start servers
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
