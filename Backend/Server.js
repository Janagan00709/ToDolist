/** @format */

const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes/TaskRoute");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Connected succesfully to the database");
  })
  .catch(function () {
    console.log("Database connection failed");
  });

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
