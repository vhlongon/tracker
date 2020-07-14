// only requires once otherwise the model is recreated if imported several times and mongoose will throw an error
require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { password } = require("./secret");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://admin:${password}@cluster0.6n64k.mongodb.net/tracker?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", error => {
  console.error("Error Connected to mongo", error);
});

// use the middleware to check if the user in loggedin
app.get("/", requireAuth, (req, res) => {
  res.send(`your email ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
