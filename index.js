// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 50001;

// middleware
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
app.use("/join", require("./routes/join.routes"));
app.use("/api/list", require("./routes/list.routes"));
app.use("/api/house", require("./routes/house.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/task", require("./routes/task.routes"));
app.use("/api/party", require("./routes/party.routes"));
app.use("/api/cost", require("./routes/cost.routes"));

// start servers
app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
);