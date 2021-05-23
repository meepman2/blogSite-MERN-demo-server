const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const composeRouter = require("./routes/compose");
const homeRouter = require("./routes/home");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("", homeRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/compose", composeRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection made");
});
