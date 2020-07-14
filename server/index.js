const express = require("express");
const mongoose = require("mongoose");
const { password } = require("./secret");

const app = express();
const mongoUri = `mongodb+srv://admin:${password}@cluster0.6n64k.mongodb.net/tracker?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", error => {
  console.error("Error Connected to mongo", error);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
